<?php

namespace Http\Controllers;

use Http\BaseController;
use Support\ImageHandler;
use Support\Validator;

class TechStackController extends BaseController
{
    public function index($f3)
    {
        $stacks = $f3->get('_STACKS')->find();

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
        $stack = $f3->get('_STACKS')
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
            'url' => ['required', 'image:5'],
            'body_en' => ['nullable', 'string', 'max:10000'],
            'body_ru' => ['nullable', 'string', 'max:10000'],
            'alt_en' => ['required', 'string', 'max:500'],
            'alt_ru' => ['required', 'string', 'max:500'],
        ]);

        if ($validator->fails()) {
            send_json(['errors' => $validator->errors()], 422);
        }

        $raw = $validator->validated();
        $handler = ImageHandler::make(
            $raw,
            'url',
            [['url', 160, 'webp']],
            'stacks'
        )->resize_one();

        $data = $handler->output();

        add_markdown_field($data, 'body_en', 'html_en');
        add_markdown_field($data, 'body_ru', 'html_ru');

        $stack = $f3->get('_STACKS');
        $stack->copyFrom($data);
        $stack->save();

        send_json(['message' => 'Stack successfully created!']);
    }

    public function update($f3)
    {
        $validator = Validator::make(array_merge($f3->get('POST'), $_FILES), [
            'url' => ['sometimes', 'image:5'],
            'body_en' => ['sometimes', 'string', 'max:10000'],
            'body_ru' => ['sometimes', 'string', 'max:10000'],
            'alt_en' => ['sometimes', 'string', 'max:500'],
            'alt_ru' => ['sometimes', 'string', 'max:500'],
        ]);

        if ($validator->fails()) {
            send_json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        $stack = $f3->get('_STACKS');
        $stack->load(['id=?', $f3->get('PARAMS.id')]);

        if (isset($data['url'])) {
            $file_path = APP_DIR . '/public/' . $stack->url;

            if (file_exists($file_path)) {
                unlink($file_path);
            }

            $handler = ImageHandler::make(
                $data,
                'url',
                [['url', 160, 'webp']],
                'stacks'
            )->resize_one();
            $data = $handler->output();
        }

        add_markdown_field($data, 'body_en', 'html_en');
        add_markdown_field($data, 'body_ru', 'html_ru');

        $stack->copyFrom($data);
        $stack->save();

        send_json(['message' => 'Stack successfully updated!']);
    }

    public function destroy($f3)
    {
        $stack = $f3->get('_STACKS');
        $stack->load(['id=?', $f3->get('PARAMS.id')]);

        $file_path = APP_DIR . '/public/' . $stack->url;

        if (file_exists($file_path)) {
            unlink($file_path);
        }

        $stack->erase();

        if (! $stack) {
            send_json(['message' =>  "Stack not found"], 422);
        }

        send_json(['message' => 'Stack successfully deleted!']);
    }
}
