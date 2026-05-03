<?php

namespace Http\Controllers;

use Http\BaseController;
use Support\ImageHandler;
use Support\Validator;

class TechStackController extends BaseController
{
    public function index($f3)
    {
        $stacks = $f3->get('_STACKS_VIEW')->find();

        $stacks = [
            'data' => array_map(
                fn($stack) => $this->to_resource($stack),
                $stacks
            )
        ];

        send_json($stacks);
    }

    public function edit($f3)
    {
        $stack = $f3->get('_STACKS_VIEW')
            ->load(['id=?', $f3->get('PARAMS.id')]);

        if (! $stack) {
            send_json(['message' =>  "stack not found"], 404);
        }

        send_json(
            ["data" => $this->to_resource($stack)]
        );
    }

    public function store($f3)
    {
        $validator = Validator::make(array_merge($f3->get('POST'), $_FILES), [
            'image' => ['required', 'image:5'],
            'body_en' => ['nullable', 'string', 'max:10000'],
            'body_ru' => ['nullable', 'string', 'max:10000'],
            'alt_en' => ['required', 'string', 'max:500'],
            'alt_ru' => ['required', 'string', 'max:500'],
        ]);

        if ($validator->fails()) {
            send_json(['errors' => $validator->errors()], 422);
        }

        $raw = $validator->validated();

        $handler = ImageHandler::make($raw, 'image', [['mb', 50]], 'stacks')
            ->resize_all();

        if ($handler->fails()) {
            send_json(['message' =>  $handler->error()], 404);
        }

        $data = $handler->output();

        $data['imageable_type'] = 'stacks';

        add_markdown_field($data, 'body_en', 'html_en');
        add_markdown_field($data, 'body_ru', 'html_ru');

        $stack = $f3->get('_STACKS');
        $stack->copyFrom($data);
        $stack->save();
        $stack_id = $f3->get('DB')->lastInsertId();

        $data['imageable_id'] = $stack_id;

        $img = $f3->get('_IMAGES');
        $img->copyFrom($data);
        $img->save();

        send_json(['message' => 'Stack successfully created!']);
    }

    public function update($f3)
    {
        $validator = Validator::make(array_merge($f3->get('POST'), $_FILES), [
            'image' => ['sometimes', 'image:5'],
            'body_en' => ['sometimes', 'string', 'max:10000'],
            'body_ru' => ['sometimes', 'string', 'max:10000'],
            'alt_en' => ['sometimes', 'string', 'max:500'],
            'alt_ru' => ['sometimes', 'string', 'max:500'],
        ]);

        if ($validator->fails()) {
            send_json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        $stack_id = $f3->get('PARAMS.id');
        $stack = $f3->get('_STACKS');
        $stack->load(['id=?', $stack_id]);

        if (isset($data['image'])) {
            $handler = ImageHandler::make($data, 'image', [['mb', 50]], 'stacks')
                ->resize_all();

            if ($handler->fails()) {
                send_json(['message' =>  $handler->error()], 404);
            }

            $data = $handler->output();
            ImageHandler::delete_morph_images($stack->id, 'stacks');
        }

        add_markdown_field($data, 'body_en', 'html_en');
        add_markdown_field($data, 'body_ru', 'html_ru');

        $stack->copyFrom($data);
        $stack->save();

        $img = $f3->get('_IMAGES');
        $img->load(['imageable_id=? AND imageable_type=?', $stack_id, 'stacks']);
        $img->copyFrom($data);
        $img->save();

        send_json(['message' => 'Stack successfully updated!']);
    }

    public function destroy($f3)
    {
        $stack = $f3->get('_STACKS');
        $stack->load(['id=?', $f3->get('PARAMS.id')]);

        $stack->erase();

        if (! $stack) {
            send_json(['message' =>  "Stack not found"], 422);
        }

        ImageHandler::delete_morph_images(
            parent_id: $f3->get('PARAMS.id'),
            parent_type: 'stacks',
            cascade: true
        );

        send_json(['message' => 'Stack successfully deleted!']);
    }
}
