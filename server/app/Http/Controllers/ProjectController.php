<?php

namespace Http\Controllers;

use Http\Resources\ProjectResource;
use Support\ImageHandler;
use Support\Validator;

class ProjectController extends ProjectResource
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
            'name_en' => ['required', 'string', 'max:200'],
            'name_ru' => ['required', 'string', 'max:200'],
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
        $handler = ImageHandler::make($raw, 'image', $sizes, 'projects')->insert_mockup((int) $raw['mockup'])->resize_all();

        if ($handler->fails()) {
            send_json(['message' =>  $handler->error()], 404);
        }

        $data = $handler->output();

        $data['imageable_type'] = 'projects';

        $category = $f3->get('_CATEGORIES');
        $category->copyFrom($data);
        $category->save();
        $category_id = $f3->get('DB')->lastInsertId();

        $data['category_id'] = $category_id;
        $data['slug'] = generate_slug($data['title_en']);

        $project = $f3->get('_PROJECTS');
        $project->copyFrom($data);
        $project->save();
        $project_id = $f3->get('DB')->lastInsertId();

        $data['imageable_id'] = $project_id;

        $img = $f3->get('_IMAGES');
        $img->copyFrom($data);
        $img->save();

        send_json(['message' => 'Project successfully created!']);
    }

    public function update($f3)
    {
        // TODO: check categories for uniqueness
        $validator = Validator::make(array_merge($f3->get('POST'), $_FILES), [
            'image' => ['sometimes', 'image:5'],
            'title_en' => ['sometimes', 'string', 'max:300'],
            'title_ru' => ['sometimes', 'string', 'max:300'],
            'description_en' => ['sometimes', 'string', 'max:5000'],
            'description_ru' => ['sometimes', 'string', 'max:5000'],
            'name_en' => ['required', 'string', 'max:200'],
            'name_ru' => ['required', 'string', 'max:200'],
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

        if (isset($data['image'])) {
            $sizes = [['mb', 520], ['tb', 1000], ['dk', 1700]];
            $handler = ImageHandler::make($data, 'image', $sizes, 'projects')->insert_mockup((int) $data['mockup'])->resize_all();

            if ($handler->fails()) {
                send_json(['message' =>  $handler->error()], 422);
            }

            $data = $handler->output();

            ImageHandler::delete_morph_images(
                $project->id,
                'projects'
            );
        }

        $category = $f3->get('_CATEGORIES');
        $category->load(['name_en=? OR name_ru=?', $data['name_en'], $data['name_ru']]);

        if (! $category) {
            $category->copyFrom($data);
            $category->save();
        }

        if ($data['title_en'] !== $project->title_en) {
            $data['slug'] = generate_slug($data['title_en']);
        }

        $project->category_id = $category->id;
        $project->copyFrom($data);
        $project->save();

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
