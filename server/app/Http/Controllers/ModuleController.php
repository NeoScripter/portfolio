<?php

namespace Http\Controllers;

use Http\BaseController;
use Support\ImageHandler;
use Support\Validator;

class ModuleController extends BaseController
{
    public function index($f3)
    {
        $modules = $f3->get('DB')->exec(
            "SELECT * FROM modules_view WHERE project_id = (
                SELECT id FROM projects WHERE slug = ?
            )",
            [$f3->get('PARAMS.project_id')]
        );

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
            'project_id' => ['required', 'exists:projects,id'],
            'first_image' => ['nullable', 'image:5'],
            'second_image' => ['nullable', 'image:5'],
            'heading_en' => ['required', 'string', 'max:300'],
            'heading_ru' => ['required', 'string', 'max:300'],
            'body_en' => ['required', 'string', 'max:5000'],
            'body_ru' => ['required', 'string', 'max:5000'],
            'priority' => ['required', 'max:300'],
            'type' => ['required', 'string'],
            'first_alt_en' => ['required_with:first_image', 'sometimes', 'string', 'max:500'],
            'first_alt_ru' => ['required_with:first_image', 'sometimes', 'string', 'max:500'],
            'second_alt_en' => ['required_with:second_image', 'sometimes', 'string', 'max:500'],
            'second_alt_ru' => ['required_with:second_image', 'sometimes', 'string', 'max:500'],
        ]);

        if ($validator->fails()) {
            send_json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        add_markdown_field($data, 'body_en', 'html_en');
        add_markdown_field($data, 'body_ru', 'html_ru');

        $module = $f3->get('_MODULES');
        $module->copyFrom($data);
        $module->save();
        $module_id = $f3->get('DB')->lastInsertId();

        $data['imageable_type'] = 'modules';
        $data['imageable_id'] = $module_id;

        if (isset($data['first_image'])) {

            $data['variant'] = 'first_image';
            $data['alt_ru'] = $data['first_alt_ru'];
            $data['alt_en'] = $data['first_alt_en'];

            $sizes = [['mb', 520], ['tb', 750]];
            $handler = ImageHandler::make($data, 'first_image', $sizes, 'modules')
                ->resize_all();

            if ($handler->fails()) {
                send_json(['message' =>  $handler->error()], 404);
            }

            $data = $handler->output();

            $img = $f3->get('_IMAGES');
            $img->copyFrom($data);
            $img->save();
        }

        if (isset($data['second_image'])) {

            $data['variant'] = 'second_image';
            $data['alt_ru'] = $data['second_alt_ru'];
            $data['alt_en'] = $data['second_alt_en'];

            $sizes = [['mb', 520], ['tb', 750]];
            $handler = ImageHandler::make($data, 'second_image', $sizes, 'modules')
                ->resize_all();

            if ($handler->fails()) {
                send_json(['message' =>  $handler->error()], 404);
            }

            $data = $handler->output();

            $img = $f3->get('_IMAGES');
            $img->copyFrom($data);
            $img->save();
        }

        send_json(['message' => 'Module successfully created!']);
    }

    public function update($f3)
    {
        $validator = Validator::make(array_merge($f3->get('POST'), $_FILES), [
            'project_id' => ['required', 'exists:projects,id'],
            'first_image' => ['sometimes', 'image:5'],
            'second_image' => ['sometimes', 'image:5'],
            'heading_en' => ['sometimes', 'string', 'max:300'],
            'heading_ru' => ['sometimes', 'string', 'max:300'],
            'body_en' => ['sometimes', 'string', 'max:5000'],
            'body_ru' => ['sometimes', 'string', 'max:5000'],
            'priority' => ['sometimes', 'max:300'],
            'type' => ['sometimes', 'string'],
            'first_alt_en' => ['required_with:first_image', 'sometimes', 'string', 'max:500'],
            'first_alt_ru' => ['required_with:first_image', 'sometimes', 'string', 'max:500'],
            'second_alt_en' => ['required_with:second_image', 'sometimes', 'string', 'max:500'],
            'second_alt_ru' => ['required_with:second_image', 'sometimes', 'string', 'max:500'],
        ]);

        if ($validator->fails()) {
            send_json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        $module_id = $f3->get('PARAMS.id');

        $module = $f3->get('_MODULES');
        $module->load(['id=?', $module_id]);
        $module_type = $module->type;

        if ($data['body_en'] !== $module->body_en) {
            add_markdown_field($data, 'body_en', 'html_en');
        }
        if ($data['body_ru'] !== $module->body_ru) {
            add_markdown_field($data, 'body_ru', 'html_ru');
        }

        $module->copyFrom($data);
        $module->save();

        // Delete the old images if the type of the module has changed
        $new_type = $data['type'] ?? $module_type;

        if ($module_type !== $new_type) {
            if ($new_type === 'only_text') {
                ImageHandler::delete_morph_images($module->id, 'modules', 2, true);
            }
            if ($new_type === 'one_image_split') {
                ImageHandler::delete_morph_images($module->id, 'modules', 1, true, "variant = 'second_image'");
            }
        }

        $data['imageable_type'] = 'modules';
        $data['imageable_id'] = $module_id;

        if (isset($data['first_image'])) {

            $data['variant'] = 'first_image';
            $data['alt_ru'] = $data['first_alt_ru'];
            $data['alt_en'] = $data['first_alt_en'];

            $sizes = [['mb', 520], ['tb', 750]];
            $handler = ImageHandler::make($data, 'first_image', $sizes, 'modules')
                ->resize_all();

            if ($handler->fails()) {
                send_json(['message' =>  $handler->error()], 404);
            }

            $data = $handler->output();

            ImageHandler::delete_morph_images($module->id, 'modules', 1, false, "variant = 'first_image'");

            $img = $f3->get('_IMAGES');
            $img->load(['imageable_id=? AND imageable_type=? AND variant=?', $module_id, 'modules', 'first_image']);
            $img->copyFrom($data);
            $img->save();
        }

        if (isset($data['second_image'])) {

            $data['variant'] = 'second_image';
            $data['alt_ru'] = $data['second_alt_ru'];
            $data['alt_en'] = $data['second_alt_en'];

            $sizes = [['mb', 520], ['tb', 750]];
            $handler = ImageHandler::make($data, 'second_image', $sizes, 'modules')
                ->resize_all();

            if ($handler->fails()) {
                send_json(['message' =>  $handler->error()], 404);
            }

            $data = $handler->output();

            ImageHandler::delete_morph_images($module->id, 'modules', 1, false, "variant = 'second_image'");

            $img = $f3->get('_IMAGES');
            $img->load(['imageable_id=? AND imageable_type=? AND variant=?', $module_id, 'modules', 'second_image']);
            $img->copyFrom($data);
            $img->save();
        }

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

        ImageHandler::delete_morph_images($module->id, 'modules', 2, true);

        $module->erase();

        send_json(['message' => 'Module successfully deleted!']);
    }
}
