<?php

namespace Controllers;

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
        $validator = Validator::make(get_json(), [
            'url' => ['required', 'image:1024'],
            'body_en' => ['nullable', 'string', 'max:10000'],
            'body_ru' => ['nullable', 'string', 'max:10000'],
            'alt_en' => ['required', 'string', 'max:500'],
            'alt_ru' => ['required', 'string', 'max:500'],
        ]);

        if ($validator->fails()) {
            send_json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

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
        $validator = Validator::make(get_json(), [
            'title_en' => ['sometimes', 'string', 'min:3', 'max:255'],
            'title_ru' => ['sometimes', 'string', 'min:3', 'max:255'],
            'content_en' => ['sometimes', 'string', 'min:3', 'max:2255'],
            'content_ru' => ['sometimes', 'string', 'min:3', 'max:2255'],
        ]);

        if ($validator->fails()) {
            send_json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

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
        $affected = $f3->get('DB')->exec(
            '
            delete from stacks where stacks.id = ?',
            [$f3->get('PARAMS.id')]
        );

        if (!$affected) {
            send_json(['message' => 'stack not found'], 422);
        }

        send_json(['message' => 'Stack successfully deleted!']);
    }
}
