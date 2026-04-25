<?php

namespace Http\Controllers;

use Http\Resources\VideoResource;
use Support\ImageHandler;
use Support\Validator;

class VideoController extends VideoResource
{
    public function index($f3)
    {
        $videos = $f3->get('_VIDEOS_VIEW')->find();

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
        $video = $f3->get('_VIDEOS_VIEW')
            ->load(['id=?', $f3->get('PARAMS.id')]);

        if (! $video) {
            send_json(['message' =>  "Video not found"], 404);
        }

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

        $raw = $validator->validated();

        $handler = ImageHandler::make(
            $raw,
            'image',
            [['mb', 500], ['tb', 600], ['dk', 900]],
            'videos'
        )->resize_all();

        if ($handler->fails()) {
            send_json(['message' =>  $handler->error()], 404);
        }

        $data = $handler->output();

        $video = $f3->get('_VIDEOS');
        $video->copyFrom($data);
        $video->save();

        $video_id = $f3->get('DB')->lastInsertId();

        $data['imageable_id'] = $video_id;
        $data['imageable_type'] = 'videos';

        $img = $f3->get('_IMAGES');
        $img->copyFrom($data);
        $img->save();

        send_json(['message' => 'Video successfully created!']);
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
        $video_id = $f3->get('PARAMS.id');

        if (isset($data['image'])) {
            $handler = ImageHandler::make(
                $data,
                'image',
                [['mb', 500], ['tb', 600], ['dk', 900]],
                'videos'
            )->resize_all();

            if ($handler->fails()) {
                send_json(['message' =>  $handler->error()], 404);
            }

            $data = $handler->output();
            ImageHandler::delete_morph_images($video_id, 'videos');
        }

        $video = $f3->get('_VIDEOS');
        $video->load(['id=?', $video_id]);
        $video->copyFrom($data);
        $video->save();

        $data['imageable_id'] = $video_id;

        $img = $f3->get('_IMAGES');
        $img->load(['imageable_id=? AND imageable_type=?', $video_id, 'videos']);
        $img->copyFrom($data);
        $img->save();

        send_json(['message' => 'Video successfully updated!']);
    }

    public function destroy($f3)
    {
        $video_id = $f3->get('PARAMS.id');

        $video = $f3->get('_VIDEOS');
        $video->load(['id=?', $video_id]);
        $video->erase();

        if (! $video) {
            send_json(['message' =>  "Video not found"], 404);
        }

        ImageHandler::delete_morph_images(
            $video_id,
            'videos'
        );

        $img = $f3->get('_IMAGES');
        $img->load(['imageable_id=? AND imageable_type=?', $video_id, 'videos']);
        $img->erase();

        send_json(['message' => 'Video successfully deleted!']);
    }
}
