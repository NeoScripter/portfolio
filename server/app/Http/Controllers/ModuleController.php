<?php

namespace Http\Controllers;

use Http\BaseController;
use Support\ImageHandler;
use Support\Validator;
use Web;

class ModuleController extends BaseController
{
    public function index($f3)
    {
        $modules = $f3->get('_MODULES_VIEW')->find();

        $modules = array_map(
            fn($module) => $this->to_resource($module),
            $modules
        );

        $data = [
            'data' => $modules
        ];

        send_json($data);
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
            'priority' => ['required', 'max:300'],
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
        $handler = ImageHandler::make($raw, 'image', $sizes, 'modules')
            ->insert_mockup((int) $raw['mockup'])
            ->resize_all();

        if ($handler->fails()) {
            send_json(['message' =>  $handler->error()], 404);
        }

        $data = $handler->output();

        $data['imageable_type'] = 'modules';

        $data['slug'] = Web::instance()->slug(
            $data['title_en'] . '-' . get_latest_id('modules')
        );

        $module = $f3->get('_MODULES');
        $module->copyFrom($data);
        $module->save();
        $module_id = $f3->get('DB')->lastInsertId();

        $db = $f3->get('DB');
        $tools = $data['technologies'] ?? [];

        // Create all the missing technologies and attach them to the module
        if (! empty($tools)) {

            $db->exec(
                "INSERT INTO technologies (name)
                VALUES " . to_wildcards($tools, '(?)') . "
                ON CONFLICT (name) DO NOTHING",
                $tools
            );

            $db->exec(
                "INSERT INTO module_technology (module_id, technology_id)
                SELECT ?, id FROM technologies
                WHERE name IN (" . to_wildcards($tools) . ")
                ON CONFLICT DO NOTHING",
                array_merge([$module_id], $tools)
            );
        }

        $data['imageable_id'] = $module_id;

        $img = $f3->get('_IMAGES');
        $img->copyFrom($data);
        $img->save();

        send_json(['message' => 'Module successfully created!']);
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
            'priority' => ['sometimes', 'max:300'],
            'alt_en' => ['sometimes', 'string', 'max:500'],
            'alt_ru' => ['sometimes', 'string', 'max:500'],
            'technologies' => ['sometimes'],
            'mockup' => ['sometimes', 'min:1', 'max:6'],
        ]);

        if ($validator->fails()) {
            send_json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        $module = $f3->get('_MODULES');
        $module->load(['slug=?', $f3->get('PARAMS.slug')]);
        $module_id = $module->id;

        $db = $f3->get('DB');

        $current_tools = array_column(
            $db->exec(
                'SELECT t.name FROM technologies t
                JOIN module_technology rel ON rel.technology_id = t.id
                WHERE rel.module_id = ?',
                [$module_id]
            ),
            'name'
        );

        if (isset($data['image'])) {
            $sizes = [['mb', 520], ['tb', 1000], ['dk', 1700]];
            $handler = ImageHandler::make($data, 'image', $sizes, 'modules')
                ->insert_mockup((int) $data['mockup'])
                ->resize_all();

            if ($handler->fails()) {
                send_json(['message' =>  $handler->error()], 422);
            }

            $data = $handler->output();

            ImageHandler::delete_morph_images(
                $module->id,
                'modules'
            );
        }

        if ($data['title_en'] !== $module->title_en) {
            $data['slug'] = Web::instance()->slug($data['title_en'] . "-{$module_id}");
        }

        $module->category_id = $data['category_id'];
        $module->copyFrom($data);
        $module->save();

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
                "INSERT INTO module_technology (module_id, technology_id)
                SELECT ?, id FROM technologies
                WHERE name IN (" . to_wildcards($tools) . ")
                ON CONFLICT DO NOTHING",
                array_merge([$module_id], $tools)
            );
        }

        // Detach all the discarded technologies if any
        $discarded = array_diff($current_tools, $tools);

        if (! empty($discarded)) {

            $db->exec(
                "DELETE FROM module_technology
                WHERE module_id = ?
                AND technology_id IN (
                    SELECT id FROM technologies
                    WHERE name IN (" . to_wildcards($discarded) . ")
                )",
                array_merge([$module_id], $discarded)
            );

            // Delete all the orphans
            $db->exec("
                DELETE FROM technologies
                WHERE id NOT IN (
                    SELECT technology_id FROM module_technology
                );");
        }

        $data['imageable_id'] = $module_id;

        $img = $f3->get('_IMAGES');
        $img->load(['imageable_id=? AND imageable_type=?', $module_id, 'modules']);
        $img->copyFrom($data);
        $img->save();

        send_json(['message' => 'Module successfully updated!']);
    }

    public function destroy($f3)
    {
        $module_id = $f3->get('PARAMS.id');

        $module = $f3->get('_MODULES');
        $module->load(['id=?', $module_id]);

        if (! $module) {
            send_json(['message' =>  "Module not found"], 422);
        }

        ImageHandler::delete_morph_images(
            $module_id,
            'modules'
        );

        $img = $f3->get('_IMAGES');
        $img->load(['imageable_id=? AND imageable_type=?', $module_id, 'modules']);
        $img->erase();

        $module->erase();

        send_json(['message' => 'Module successfully deleted!']);
    }
}
