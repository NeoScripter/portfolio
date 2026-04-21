<?php

namespace Controllers;

use Support\DBHandler;
use Support\ImageHandler;
use Support\Validator;

class ProjectController
{
    private $image_variants = [
        ['dk_webp', 1700, 'webp'],
        ['dk_avif', 1700, 'avif'],
        ['dk_webp_2x', 3400, 'webp'],
        ['dk_avif_2x', 3400, 'avif'],
        ['dk_webp_3x', 5200, 'webp'],
        ['dk_avif_3x', 5200, 'avif'],
        ['tb_webp', 1000, 'webp'],
        ['tb_avif', 1000, 'avif'],
        ['tb_webp_2x', 2000, 'webp'],
        ['tb_avif_2x', 2000, 'avif'],
        ['tb_webp_3x', 3000, 'webp'],
        ['tb_avif_3x', 3000, 'avif'],
        ['mb_webp', 520, 'webp'],
        ['mb_avif', 520, 'avif'],
        ['mb_webp_2x', 1040, 'webp'],
        ['mb_avif_2x', 1040, 'avif'],
        ['mb_webp_3x', 1560, 'webp'],
        ['mb_avif_3x', 1560, 'avif'],
        ['tiny', 20, 'webp'],
    ];

    private function toResource($project)
    {
        return [
            'id' => $project['project_id'],
            'attr' => [
                'title' => [
                    'ru' => $project['title_ru'],
                    'en' => $project['title_en'],
                ],
                'description' => [
                    'ru' => $project['description_ru'],
                    'en' => $project['description_en'],
                ],
                'category' => [
                    'ru' => $project['category_ru'],
                    'en' => $project['category_en'],
                ],
                'stacks' => $project['stacks'],
                'slug' => $project['slug'],
                'link' => $project['link'],
                'order' => $project['display_order'],
            ],
            'image' => [
                'srcSet' => [
                    'dk' => $project['dk_webp'],
                    'dkAvif' => $project['dk_avif'],
                    'dk2x' => $project['dk_webp_2x'],
                    'dkAvif2x' => $project['dk_avif_2x'],
                    'dk3x' => $project['dk_webp_3x'],
                    'dkAvif3x' => $project['dk_avif_3x'],
                    'dkTiny' => $project['tiny'],

                    'tb' => $project['tb_webp'],
                    'tbAvif' => $project['tb_avif'],
                    'tb2x' => $project['tb_webp_2x'],
                    'tbAvif2x' => $project['tb_avif_2x'],
                    'tb3x' => $project['tb_webp_3x'],
                    'tbAvif3x' => $project['tb_avif_3x'],
                    'tbTiny' => $project['tiny'],

                    'mb' => $project['mb_webp'],
                    'mbAvif' => $project['mb_avif'],
                    'mb2x' => $project['mb_webp_2x'],
                    'mbAvif2x' => $project['mb_avif_2x'],
                    'mb3x' => $project['mb_webp_3x'],
                    'mbAvif3x' => $project['mb_avif_3x'],
                    'mbTiny' => $project['tiny'],
                ],
                'alt' => [
                    'ru' => $project['alt_ru'],
                    'en' => $project['alt_en'],
                ],
            ]
        ];
    }

    public function index($f3)
    {
        $projects = $f3->get('DB')->exec(
            "SELECT r.id project_id, r.*, i.id img_id, i.*
             FROM projects r
             LEFT JOIN images i ON i.imageable_id = r.id AND i.imageable_type = 'projects'",
        );

        $projects = array_map(
            fn($project) => $this->toResource($project),
            $projects
        );

        $data = [
            'data' => $projects
        ];

        send_json($data);
    }

    public function edit($f3)
    {
        $result = $f3->get('DB')->exec(
            "SELECT r.id project_id, r.*, i.id img_id, i.*
            FROM projects r
            LEFT JOIN images i ON i.imageable_id = r.id AND i.imageable_type = 'projects'
            WHERE r.id = ?",
            [$f3->get('PARAMS.id')]
        );

        if (empty($result)) {
            send_json(['message' =>  "project not found"], 404);
            $f3->error(404, "project not found");
        }

        $project = $result[0];

        send_json(
            ["data" => $this->toResource($project)]
        );
    }

    public function store($f3)
    {
        $validator = Validator::make(array_merge($f3->get('POST'), $_FILES), [
            'image' => ['required', 'image:5'],
            'name_en' => ['required', 'string', 'max:200'],
            'name_ru' => ['required', 'string', 'max:200'],
            'content_en' => ['required', 'string', 'max:5000'],
            'content_ru' => ['required', 'string', 'max:5000'],
            'alt_en' => ['required', 'string', 'max:500'],
            'alt_ru' => ['required', 'string', 'max:500'],
        ]);

        if ($validator->fails()) {
            send_json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        $img_handler = ImageHandler::make(
            $data,
            'image',
            $this->image_variants,
            'projects'
        );

        $img_handler->resize_all();

        [$entry_data, $img_data] = split_data($data, 'projects');

        $db_handler = DBHandler::make($entry_data);
        $project_id = $db_handler->create_entry('projects');

        $img_data['imageable_id'] = $project_id;

        $img_db_handler = DBHandler::make($img_data);
        $img_db_handler->create_entry('images');

        send_json(['message' => 'project successfully created!']);
    }

    public function update($f3)
    {
        $validator = Validator::make(array_merge($f3->get('POST'), $_FILES), [
            'image' => ['sometimes', 'image:5'],
            'name_en' => ['sometimes', 'string', 'max:200'],
            'name_ru' => ['sometimes', 'string', 'max:200'],
            'content_en' => ['sometimes', 'string', 'max:5000'],
            'content_ru' => ['sometimes', 'string', 'max:5000'],
            'alt_en' => ['sometimes', 'string', 'max:500'],
            'alt_ru' => ['sometimes', 'string', 'max:500'],
        ]);

        if ($validator->fails()) {
            send_json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        if (isset($data['image'])) {
            $img_handler = ImageHandler::make($data, 'image', $this->image_variants, 'projects');

            $img_handler->resize_all();

            ImageHandler::purge_files(
                'images',
                array_map(
                    fn($var) => $var[0],
                    $this->image_variants
                ),
                (int) $f3->get('PARAMS.id'),
                'projects'
            );
        }

        [$entry_data, $img_data] = split_data($data);

        $db_handler = DBHandler::make($entry_data);
        $db_handler->update_entry('projects', (int) $f3->get('PARAMS.id'));

        $db_handler = DBHandler::make($img_data);
        $db_handler->update_image_entry((int) $f3->get('PARAMS.id'), 'projects');

        send_json(['message' => 'project successfully updated!']);
    }

    public function destroy($f3)
    {
        $affected = DBHandler::delete_entry(
            'projects',
            (int) $f3->get('PARAMS.id')
        );

        if (!$affected) {
            send_json(['message' => 'Project not found'], 422);
        }

        DBHandler::delete_image_entry(
            'projects',
            (int) $f3->get('PARAMS.id'),
            $this->image_variants
        );

        send_json(['message' => 'project successfully deleted!']);
    }
}
