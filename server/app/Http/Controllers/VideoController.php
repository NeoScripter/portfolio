<?php

namespace Http\Controllers;

use Support\DBHandler;
use Support\ImageHandler;
use Support\Validator;

class VideoController
{
    private $image_variants = [
        ['dk_webp', 900, 'webp'],
        ['dk_avif', 900, 'avif'],
        ['dk_webp_2x', 1800, 'webp'],
        ['dk_avif_2x', 1800, 'avif'],
        ['dk_webp_3x', 2700, 'webp'],
        ['dk_avif_3x', 2700, 'avif'],
        ['tb_webp', 600, 'webp'],
        ['tb_avif', 600, 'avif'],
        ['tb_webp_2x', 1200, 'webp'],
        ['tb_avif_2x', 1200, 'avif'],
        ['tb_webp_3x', 1800, 'webp'],
        ['tb_avif_3x', 1800, 'avif'],
        ['mb_webp', 500, 'webp'],
        ['mb_avif', 500, 'avif'],
        ['mb_webp_2x', 1000, 'webp'],
        ['mb_avif_2x', 1000, 'avif'],
        ['mb_webp_3x', 1500, 'webp'],
        ['mb_avif_3x', 1500, 'avif'],
        ['tiny', 20, 'webp'],
    ];

    private function toResource($video)
    {
        return [
            'id' => $video['video_id'],
            'attr' => [
                'url' => $video['url'],
                'title' => [
                    'ru' => $video['title_ru'],
                    'en' => $video['title_en'],
                ],
            ],
            'image' => [
                'srcSet' => [
                    'dk' => $video['dk_webp'],
                    'dkAvif' => $video['dk_avif'],
                    'dk2x' => $video['dk_webp_2x'],
                    'dkAvif2x' => $video['dk_avif_2x'],
                    'dk3x' => $video['dk_webp_3x'],
                    'dkAvif3x' => $video['dk_avif_3x'],
                    'tb' => $video['tb_webp'],
                    'tbAvif' => $video['tb_avif'],
                    'tb2x' => $video['tb_webp_2x'],
                    'tbAvif2x' => $video['tb_avif_2x'],
                    'tb3x' => $video['tb_webp_3x'],
                    'tbAvif3x' => $video['tb_avif_3x'],
                    'mb' => $video['mb_webp'],
                    'mbAvif' => $video['mb_avif'],
                    'mb2x' => $video['mb_webp_2x'],
                    'mbAvif2x' => $video['mb_avif_2x'],
                    'mb3x' => $video['mb_webp_3x'],
                    'mbAvif3x' => $video['mb_avif_3x'],
                    'mbTiny' => $video['tiny'],
                ],
                'alt' => [
                    'ru' => $video['alt_ru'],
                    'en' => $video['alt_en'],
                ],
            ]
        ];
    }

    public function index($f3)
    {
        $videos = $f3->get('DB')->exec(
            "SELECT v.id video_id, v.*, i.id img_id, i.*
             FROM videos v
             LEFT JOIN images i ON i.imageable_id = v.id AND i.imageable_type = 'videos'",
        );

        $duplicated = filter_var(
            $f3->get('GET.duplicated'),
            FILTER_VALIDATE_BOOLEAN
        );

        $videos = array_map(
            fn($video) => $this->toResource($video),
            $videos
        );

        $data = [
            'data' => $duplicated ? duplicate_array($videos) : $videos
        ];

        send_json($data);
    }

    public function edit($f3)
    {
        $result = $f3->get('DB')->exec(
            "SELECT v.id video_id, v.*, i.id img_id, i.*
            FROM videos v
            LEFT JOIN images i ON i.imageable_id = v.id AND i.imageable_type = 'videos'
            WHERE v.id = ?",
            [$f3->get('PARAMS.id')]
        );

        if (empty($result)) {
            send_json(['message' =>  "video not found"], 404);
            $f3->error(404, "video not found");
        }

        $video = $result[0];

        send_json(
            ["data" => $this->toResource($video)]
        );
    }

    public function store($f3)
    {
        $validator = Validator::make(array_merge($f3->get('POST'), $_FILES), [
            'image' => ['required', 'image:5'],
            'url' => ['required', 'string', 'max:200'],
            'title_en' => ['required', 'string', 'max:1000'],
            'title_ru' => ['required', 'string', 'max:1000'],
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
            'videos'
        );

        $img_handler->resize_all();

        [$entry_data, $img_data] = split_data($data, 'videos');

        $video = $f3->get('_VIDEOS');
        $video->copyFrom($entry_data);
        $video->save();

        $img_data['imageable_id'] = $video->id;

        $img = $f3->get('_IMAGES');
        $img->copyFrom($img_data);
        $img->save();

        send_json(['message' => 'video successfully created!']);
    }

    public function update($f3)
    {
        $validator = Validator::make(array_merge($f3->get('POST'), $_FILES), [
            'image' => ['sometimes', 'image:5'],
            'url' => ['sometimes', 'string', 'max:200'],
            'title_en' => ['sometimes', 'string', 'max:1000'],
            'title_ru' => ['sometimes', 'string', 'max:1000'],
            'alt_en' => ['sometimes', 'string', 'max:500'],
            'alt_ru' => ['sometimes', 'string', 'max:500'],
        ]);

        if ($validator->fails()) {
            send_json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        if (isset($data['image'])) {
            $img_handler = ImageHandler::make($data, 'image', $this->image_variants, 'videos');

            $img_handler->resize_all();

            ImageHandler::purge_files(
                'images',
                array_map(
                    fn($var) => $var[0],
                    $this->image_variants
                ),
                (int) $f3->get('PARAMS.id'),
                'videos'
            );
        }

        [$entry_data, $img_data] = split_data($data, 'videos');

        $video = $f3->get('_VIDEOS');
        $video->load(['id=?', $f3->get('PARAMS.id')]);
        $video->copyFrom($entry_data);
        $video->save();

        $img_data['imageable_id'] = $video->id;

        $img = $f3->get('_IMAGES');
        $img->load(['imageable_id=? AND imageable_type=?', $f3->get('PARAMS.id'), 'videos']);
        $img->copyFrom($img_data);
        $img->save();

        send_json(['message' => 'Video successfully updated!']);
    }

    public function destroy($f3)
    {
        $video = $f3->get('_VIDEOS');
        $video->load(['id=?', $f3->get('PARAMS.id')]);
        $video->erase();

        if ($video->dry()) {
            send_json(['message' =>  "Video not found"], 404);
        }

        ImageHandler::purge_files(
            'images',
            array_map(
                fn($var) => $var[0],
                $this->image_variants
            ),
            (int) $f3->get('PARAMS.id'),
            'videos'
        );

        $img = $f3->get('_IMAGES');
        $img->load(['imageable_id=? AND imageable_type=?', $f3->get('PARAMS.id'), 'videos']);
        $img->erase();

        send_json(['message' => 'Video successfully deleted!']);
    }
}
