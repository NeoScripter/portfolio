<?php

namespace Http\Controllers;

use Http\BaseController;
use Support\ImageHandler;
use Support\Validator;
use Web;

class ProjectController extends BaseController
{
    public function index($f3)
    {
        $projects = $f3->get('_PROJECTS_VIEW')->find();

        $projects = array_map(
            fn($project) => $this->to_resource($project),
            $projects
        );

        $data = [
            'data' => $projects
        ];

        send_json($data);
    }

    public function edit($f3)
    {
        $project = $f3->get('_PROJECTS_VIEW')
            ->load(['slug=?', $f3->get('PARAMS.slug')]);

        if (! $project) {
            send_json(['message' =>  "Project not found"], 404);
        }

        send_json(
            ["data" => $this->to_resource($project)]
        );
    }

    public function store($f3)
    {
        $validator = Validator::make(array_merge($f3->get('POST'), $_FILES), [
            'image' => ['required', 'image:5'],
            'title_en' => ['required', 'string', 'max:300'],
            'title_ru' => ['required', 'string', 'max:300'],
            'description_en' => ['required', 'string', 'max:5000'],
            'description_ru' => ['required', 'string', 'max:5000'],
            'category_id' => ['required', 'exists:categories,id'],
            'link' => ['nullable', 'string', 'max:300'],
            'display_order' => ['required', 'max:300'],
            'alt_en' => ['required', 'string', 'max:500'],
            'alt_ru' => ['required', 'string', 'max:500'],
            'technologies' => ['nullable'],
            'mockup' => ['required', 'min:1', 'max:6'],
        ]);

        if ($validator->fails()) {
            send_json(['errors' => $validator->errors()], 422);
        }

        $raw = $validator->validated();

        $sizes = [['mb', 520], ['tb', 1000], ['dk', 1700]];
        $handler = ImageHandler::make($raw, 'image', $sizes, 'projects')
            ->insert_mockup((int) $raw['mockup'])
            ->resize_all();

        if ($handler->fails()) {
            send_json(['message' =>  $handler->error()], 404);
        }

        $data = $handler->output();

        $data['imageable_type'] = 'projects';

        $data['slug'] = Web::instance()->slug(
            $data['title_en'] . '-' . get_latest_id('projects')
        );

        $project = $f3->get('_PROJECTS');
        $project->copyFrom($data);
        $project->save();
        $project_id = $f3->get('DB')->lastInsertId();

        $db = $f3->get('DB');
        $tools = $data['technologies'] ?? [];

        // Create all the missing technologies and attach them to the project
        if (! empty($tools)) {

            $db->exec(
                "INSERT INTO technologies (name)
                VALUES " . to_wildcards($tools, '(?)') . "
                ON CONFLICT (name) DO NOTHING",
                $tools
            );

            $db->exec(
                "INSERT INTO project_technology (project_id, technology_id)
                SELECT ?, id FROM technologies
                WHERE name IN (" . to_wildcards($tools) . ")
                ON CONFLICT DO NOTHING",
                array_merge([$project_id], $tools)
            );
        }

        $data['imageable_id'] = $project_id;

        $img = $f3->get('_IMAGES');
        $img->copyFrom($data);
        $img->save();

        send_json(['message' => 'Project successfully created!']);
    }

    public function update($f3)
    {
        $validator = Validator::make(array_merge($f3->get('POST'), $_FILES), [
            'image' => ['sometimes', 'image:5'],
            'title_en' => ['sometimes', 'string', 'max:300'],
            'title_ru' => ['sometimes', 'string', 'max:300'],
            'description_en' => ['sometimes', 'string', 'max:5000'],
            'description_ru' => ['sometimes', 'string', 'max:5000'],
            'category_id' => ['required', 'exists:categories,id'],
            'link' => ['sometimes', 'string', 'max:300'],
            'display_order' => ['sometimes', 'max:300'],
            'alt_en' => ['sometimes', 'string', 'max:500'],
            'alt_ru' => ['sometimes', 'string', 'max:500'],
            'technologies' => ['sometimes'],
            'mockup' => ['sometimes', 'min:1', 'max:6'],
        ]);

        if ($validator->fails()) {
            send_json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        $project = $f3->get('_PROJECTS');
        $project->load(['slug=?', $f3->get('PARAMS.slug')]);
        $project_id = $project->id;

        $db = $f3->get('DB');

        $current_tools = array_column(
            $db->exec(
                'SELECT t.name FROM technologies t
                JOIN project_technology rel ON rel.technology_id = t.id
                WHERE rel.project_id = ?',
                [$project_id]
            ),
            'name'
        );

        if (isset($data['image'])) {
            $sizes = [['mb', 520], ['tb', 1000], ['dk', 1700]];
            $handler = ImageHandler::make($data, 'image', $sizes, 'projects')
                ->insert_mockup((int) $data['mockup'])
                ->resize_all();

            if ($handler->fails()) {
                send_json(['message' =>  $handler->error()], 422);
            }

            $data = $handler->output();

            ImageHandler::delete_morph_images(
                $project->id,
                'projects'
            );
        }

        if ($data['title_en'] !== $project->title_en) {
            $data['slug'] = Web::instance()->slug($data['title_en'] . "-{$project_id}");
        }

        $project->category_id = $data['category_id'];
        $project->copyFrom($data);
        $project->save();

        $tools = $data['technologies'] ?? [];

        // Attach all the technologies that are not attached yet
        if (! empty($tools)) {

            $db->exec(
                "INSERT INTO technologies (name)
                VALUES " . to_wildcards($tools, '(?)') . "
                ON CONFLICT (name) DO NOTHING",
                $tools
            );

            $db->exec(
                "INSERT INTO project_technology (project_id, technology_id)
                SELECT ?, id FROM technologies
                WHERE name IN (" . to_wildcards($tools) . ")
                ON CONFLICT DO NOTHING",
                array_merge([$project_id], $tools)
            );
        }

        // Detach all the discarded technologies if any
        $discarded = array_diff($current_tools, $tools);

        if (! empty($discarded)) {

            $db->exec(
                "DELETE FROM project_technology
                WHERE project_id = ?
                AND technology_id IN (
                    SELECT id FROM technologies
                    WHERE name IN (" . to_wildcards($discarded) . ")
                )",
                array_merge([$project_id], $discarded)
            );

            // Delete all the orphans
            $db->exec("
                DELETE FROM technologies
                WHERE id NOT IN (
                    SELECT technology_id FROM project_technology
                );");
        }

        $data['imageable_id'] = $project_id;

        $img = $f3->get('_IMAGES');
        $img->load(['imageable_id=? AND imageable_type=?', $project_id, 'projects']);
        $img->copyFrom($data);
        $img->save();

        send_json(['message' => 'Project successfully updated!']);
    }

    public function destroy($f3)
    {
        $project_id = $f3->get('PARAMS.id');

        $project = $f3->get('_PROJECTS');
        $project->load(['id=?', $project_id]);

        if (! $project) {
            send_json(['message' =>  "Project not found"], 422);
        }

        ImageHandler::delete_morph_images(
            $project_id,
            'projects'
        );

        $img = $f3->get('_IMAGES');
        $img->load(['imageable_id=? AND imageable_type=?', $project_id, 'projects']);
        $img->erase();

        $project->erase();

        send_json(['message' => 'Project successfully deleted!']);
    }
}
