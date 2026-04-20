<?php

namespace Controllers;

use Support\DBHandler;
use Support\ImageHandler;
use Support\Validator;

class TechStackController
{
    private function toResource($stack)
    {
        return [
            'id' => $stack['id'],
            'attr' => [
                'html' => [
                    'ru' => $stack['html_ru'],
                    'en' => $stack['html_en'],
                ],
                'body' => [
                    'ru' => $stack['body_ru'],
                    'en' => $stack['body_en'],
                ],
                'alt' => [
                    'ru' => $stack['alt_ru'],
                    'en' => $stack['alt_en'],
                ],
                'url' => $stack['url']
            ]
        ];
    }

    public function index($f3)
    {
        $stacks = $f3->get('DB')->exec('select * from stacks');

        $stacks = [
            'data' => array_map(
                fn($stack) => $this->toResource($stack),
                $stacks
            )
        ];

        send_json($stacks);
    }

    public function edit($f3)
    {
        $result = $f3->get('DB')->exec(
            '
            select * from stacks where stacks.id = ?',
            [$f3->get('PARAMS.id')]
        );

        if (empty($result)) {
            send_json(['message' =>  "stack not found"], 404);
            $f3->error(404, "stack not found");
        }

        $stack = $result[0];

        send_json(
            ["data" => $this->toResource($stack)]
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

        $data = $validator->validated();
        $img_handler = ImageHandler::make($data, 'url', [['url', 160, 'webp']], 'stacks');
        $img_handler->resize_all();

        $db_handler = DBHandler::make($data);
        $db_handler->add_markdown_field('body_en', 'html_en');
        $db_handler->add_markdown_field('body_ru', 'html_ru');
        $db_handler->create_entry('stacks');

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

        if (isset($data['url'])) {
            $img_handler = ImageHandler::make($data, 'url', [['url', 160, 'webp']], 'stacks');
            ImageHandler::purge_files('stacks', ['url'], (int) $f3->get('PARAMS.id'));
            $img_handler->resize_all();
        }

        $db_handler = DBHandler::make($data);
        $db_handler->add_markdown_field('body_en', 'html_en');
        $db_handler->add_markdown_field('body_ru', 'html_ru');
        $db_handler->update_entry('stacks', (int) $f3->get('PARAMS.id'));

        send_json(['message' => 'Stack successfully updated!']);
    }

    public function destroy($f3)
    {
        ImageHandler::purge_files('stacks', ['url'], (int) $f3->get('PARAMS.id'));

        $f3->get('DB')->exec(
            'DELETE FROM stacks WHERE id = ?',
            [(int) $f3->get('PARAMS.id')]
        );

        send_json(['message' => 'Stack successfully deleted!']);
    }
}
