<?php

namespace Http\Controllers;

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
        $stacks = !empty($project['tech_stack']) ?
            explode(',', $project['tech_stack']) : [];

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
                'stacks' => $stacks,
                'slug' => $project['slug'],
                'link' => $project['link'],
                'display_order' => $project['display_order'],
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
        $projects = $f3->get('_PROJECTS_VIEW')->find();

        $projects = array_map(
            fn($project) => $this->toResource($project),
            $projects
        );

        if (empty($projects)) {
            send_json(['message' =>  "Projects not found"], 404);
        }

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
            ["data" => $this->toResource($project)]
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

        $data = $validator->validated();

        $img_handler = ImageHandler::make(
            $data,
            'image',
            $this->image_variants,
            'projects'
        );

        $img_handler->resize_all();

        $data['imageable_type'] = 'projects';

        $category = $f3->get('_CATEGORIES');
        $category->copyFrom($data);
        $category->save();

        $data['category_id'] = $category->id;
        $data['slug'] = generate_slug($data['title_en']);

        $project = $f3->get('_PROJECTS');
        $project->copyFrom($data);
        $project->save();

        $data['imageable_id'] = $project->id;

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
            'name_en' => ['sometimes', 'string', 'max:200'],
            'name_ru' => ['sometimes', 'string', 'max:200'],
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
        $project->copyFrom($data);
        $project->save();

        if (isset($data['image'])) {
            $img_handler = ImageHandler::make($data, 'image', $this->image_variants, 'projects');

            $img_handler->resize_all();

            ImageHandler::purge_files(
                'images',
                array_map(
                    fn($var) => $var[0],
                    $this->image_variants
                ),
                (int) $project->id,
                'projects'
            );
        }

        $category = $f3->get('_CATEGORIES');

        // TODO: need to refactor
        if (! $project->category_id()) {
            $category->copyFrom($data);
            $category->save();
        } else {
            $category->load(['id=?', $project->category_id]);

            if ($category->name_en !== $data['name_en']) {
                $category->reset();
                $category->copyFrom($data);
                $category->save();
                $project->category_id = $category->id;
                $project->save();
            }
        }

        if ($data['title_en'] !== $project->title_en) {
            $data['slug'] = generate_slug($data['title_en']);
        }

        $data['imageable_id'] = $project->id;

        $img = $f3->get('_IMAGES');
        $img->load(['imageable_id=? AND imageable_type=?', $project->id, 'projects']);
        $img->copyFrom($data);
        $img->save();

        send_json(['message' => 'Project successfully updated!']);
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
