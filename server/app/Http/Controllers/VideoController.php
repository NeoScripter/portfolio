<?php

namespace Http\Controllers;

use Http\Resources\VideoResource;
use Support\ImageHandler;
use Support\Validator;

class VideoController extends VideoResource
{
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
            fn($video) => $this->to_resource($video),
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
            ["data" => $this->to_resource($video)]
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

        $handler = ImageHandler::make($data, 'image', [['mb', 500], ['tb', 600], ['dk', 900]], 'videos');

        $handler->resize_all();

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
            $handler = ImageHandler::make($data, 'image', [['mb', 500], ['tb', 600], ['dk', 900]], 'videos');

            $handler->resize_all();

            ImageHandler::delete_morph_images(
                $f3->get('PARAMS.id'),
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

        ImageHandler::delete_morph_images(
            $f3->get('PARAMS.id'),
            'videos'
        );

        $img = $f3->get('_IMAGES');
        $img->load(['imageable_id=? AND imageable_type=?', $f3->get('PARAMS.id'), 'videos']);
        $img->erase();

        send_json(['message' => 'Video successfully deleted!']);
    }
}
