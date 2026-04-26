<?php

namespace Http\Resources;

class ReviewResource
{
    public static function to_resource($review)
    {
        return [
            'id' => $review['id'],
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
                    'mbTiny' => $review['mb_tiny'],
                ],
                'alt' => [
                    'ru' => $review['alt_ru'],
                    'en' => $review['alt_en'],
                ],
            ]
        ];
    }
}
