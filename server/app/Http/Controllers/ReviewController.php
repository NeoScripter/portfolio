<?php

namespace Http\Controllers;

use Http\BaseController;
use Support\ImageHandler;
use Support\Validator;

class ReviewController extends BaseController
{
    public function index($f3)
    {
        $reviews = $f3->get('_REVIEWS_VIEW')->find();

        if (empty($reviews)) {
            send_json(['message' =>  "Reviews not found"], 404);
        }

        $duplicated = filter_var(
            $f3->get('GET.duplicated'),
            FILTER_VALIDATE_BOOLEAN
        );

        $reviews = array_map(
            fn($review) => $this->to_resource($review),
            $reviews
        );

        $data = [
            'data' => $duplicated ? duplicate_array($reviews) : $reviews
        ];

        send_json($data);
    }

    public function edit($f3)
    {
        $review = $f3->get('_REVIEWS_VIEW')
            ->load(['id=?', $f3->get('PARAMS.id')]);

        if (! $review) {
            send_json(['message' =>  "review not found"], 404);
            $f3->error(404, "review not found");
        }

        send_json(
            ["data" => $this->to_resource($review)]
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

        $review = $f3->get('_REVIEWS');
        $review->copyFrom($data);
        $review->save();
        $review_id = $f3->get('DB')->lastInsertId();

        ImageHandler::make($data, 'image', [['mb', 180]], 'reviews')
            ->enqueue($review_id, 'reviews');

        send_json(['message' => 'Review successfully created!']);
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
        $review_id = $f3->get('PARAMS.id');

        $review = $f3->get('_REVIEWS');
        $review->load(['id=?', $review_id]);
        $review->copyFrom($data);
        $review->save();

        if (isset($data['image'])) {
            ImageHandler::make($data, 'image', [['mb', 180]], 'reviews')
                ->enqueue($review_id, 'reviews');
        }

        send_json(['message' => 'review successfully updated!']);
    }

    public function destroy($f3)
    {
        $review_id = $f3->get('PARAMS.id');

        $review = $f3->get('_REVIEWS');
        $review->load(['id=?', $review_id]);
        $review->erase();

        if (! $review) {
            send_json(['message' =>  "review not found"], 422);
        }

        ImageHandler::delete_morph_images(
            $review_id,
            'reviews'
        );

        $img = $f3->get('_IMAGES');
        $img->load(['imageable_id=? AND imageable_type=?', $review_id, 'reviews']);
        $img->erase();

        send_json(['message' => 'Review successfully deleted!']);
    }
}
