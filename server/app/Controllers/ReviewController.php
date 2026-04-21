<?php

namespace Controllers;

use Support\ImageHandler;
use Support\Validator;

class ReviewController
{
    private $image_variants = [
        ['mb_webp', 180, 'webp'],
        ['mb_avif', 180, 'avif'],
        ['mb_webp_2x', 360, 'webp'],
        ['mb_avif_2x', 360, 'avif'],
        ['mb_webp_3x', 540, 'webp'],
        ['mb_avif_3x', 540, 'avif'],
        ['tiny', 20, 'webp'],
    ];

    private function toResource($review)
    {
        return [
            'id' => $review['review_id'],
            'attr' => [
                'author' => [
                    'ru' => $review['name_ru'],
                    'en' => $review['name_en'],
                ],
                'description' => [
                    'ru' => $review['content_ru'],
                    'en' => $review['content_en'],
                ],
            ],
            'image' => [
                'srcSet' => [
                    'mb' => $review['mb_webp'],
                    'mbAvif' => $review['mb_avif'],
                    'mb2x' => $review['mb_webp_2x'],
                    'mbAvif2x' => $review['mb_avif_2x'],
                    'mb3x' => $review['mb_webp_3x'],
                    'mbAvif3x' => $review['mb_avif_3x'],
                    'mbTiny' => $review['tiny'],
                ],
                'alt' => [
                    'ru' => $review['alt_ru'],
                    'en' => $review['alt_en'],
                ],
            ]
        ];
    }

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
            fn($review) => $this->toResource($review),
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
            ->load(['review_id=?', $f3->get('PARAMS.id')]);

        if ($review->dry()) {
            send_json(['message' =>  "review not found"], 404);
            $f3->error(404, "review not found");
        }

        send_json(
            ["data" => $this->toResource($review)]
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
            'reviews'
        );

        $img_handler->resize_all();

        [$entry_data, $img_data] = split_data($data, 'reviews');

        $review = $f3->get('_REVIEWS');
        $review->copyFrom($entry_data);
        $review->save();

        $img_data['imageable_id'] = $review->id;

        $img = $f3->get('_IMAGES');
        $img->copyFrom($img_data);
        $img->save();

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

        if (isset($data['image'])) {
            $img_handler = ImageHandler::make($data, 'image', $this->image_variants, 'reviews');

            $img_handler->resize_all();

            ImageHandler::purge_files(
                'images',
                array_map(
                    fn($var) => $var[0],
                    $this->image_variants
                ),
                (int) $f3->get('PARAMS.id'),
                'reviews'
            );
        }

        [$entry_data, $img_data] = split_data($data, 'reviews');

        $review = $f3->get('_REVIEWS');
        $review->load(['id=?', $f3->get('PARAMS.id')]);
        $review->copyFrom($entry_data);
        $review->save();

        $img_data['imageable_id'] = $review->id;

        $img = $f3->get('_IMAGES');
        $img->load(['imageable_id=? AND imageable_type=?', $f3->get('PARAMS.id'), 'reviews']);
        $img->copyFrom($img_data);
        $img->save();

        send_json(['message' => 'review successfully updated!']);
    }

    public function destroy($f3)
    {
        $review = $f3->get('_REVIEWS');
        $review->load(['id=?', $f3->get('PARAMS.id')]);
        $review->erase();

        if ($review->dry()) {
            send_json(['message' =>  "review not found"], 422);
        }

        ImageHandler::purge_files(
            'images',
            array_map(
                fn($var) => $var[0],
                $this->image_variants
            ),
            (int) $f3->get('PARAMS.id'),
            'reviews'
        );

        $img = $f3->get('_IMAGES');
        $img->load(['imageable_id=? AND imageable_type=?', $f3->get('PARAMS.id'), 'reviews']);
        $img->erase();

        send_json(['message' => 'Review successfully deleted!']);
    }
}
