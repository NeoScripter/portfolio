<?php

namespace Controllers;

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
            'url' => ['required', 'image:2'],
            'body_en' => ['nullable', 'string', 'max:10000'],
            'body_ru' => ['nullable', 'string', 'max:10000'],
            'alt_en' => ['required', 'string', 'max:500'],
            'alt_ru' => ['required', 'string', 'max:500'],
        ]);

        if ($validator->fails()) {
            send_json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        $handler = ImageHandler::make($data, 'url', [['url', 160, 'webp']], 'stacks');
        $handler->resize_all();

        if (isset($data['body_en']) && $data['body_en']) {
            $data['html_en'] = to_markdown($data['body_en']);
        }
        if (isset($data['body_ru']) && $data['body_ru']) {
            $data['html_ru'] = to_markdown($data['body_ru']);
        }

        $cols = implode(
            ', ',
            array_map(
                fn($col) => "`$col`",
                array_keys($data)
            )
        );

        $placeholders = implode(
            ', ',
            array_fill(0, count($data), '?')
        );

        $values = array_values($data);

        $f3->get('DB')->exec(
            "insert into stacks ($cols) values ($placeholders)",
            $values
        );

        send_json(['message' => 'Stack successfully created!']);
    }

    public function update($f3)
    {
        $validator = Validator::make(array_merge($f3->get('POST'), $_FILES), [
            'url' => ['sometimes', 'image:2'],
            'body_en' => ['sometimes', 'string', 'max:10000'],
            'body_ru' => ['sometimes', 'string', 'max:10000'],
            'alt_en' => ['sometimes', 'string', 'max:500'],
            'alt_ru' => ['sometimes', 'string', 'max:500'],
        ]);

        if ($validator->fails()) {
            send_json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        if (isset($data['body_en'])) {
            $data['html_en'] = to_markdown($data['body_en']);
        }
        if (isset($data['body_ru'])) {
            $data['html_ru'] = to_markdown($data['body_ru']);
        }

        if (isset($data['url'])) {
            $handler = ImageHandler::make($data, 'url', [['url', 160, 'webp']], 'stacks');
            ImageHandler::purge_files('stacks', ['url'], (int) $f3->get('PARAMS.id'));
            $handler->resize_all();
        }

        $set = implode(
            ', ',
            array_map(
                fn($col) => "`$col` = ?",
                array_keys($data)
            )
        );

        $values = array_values($data);
        $values[] = (int) $f3->get('PARAMS.id');

        $f3->get('DB')->exec(
            "update stacks set $set where stacks.id = ?",
            $values
        );

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
