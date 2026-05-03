<?php

namespace Http\Resources;

class TechStackResource
{
    public static function to_resource($stack)
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
            ],
            'image' => [
                'srcSet' => [
                    'mb' => $stack['mb_webp'],
                    'mbAvif' => $stack['mb_avif'],
                    'mb2x' => $stack['mb_webp_2x'],
                    'mbAvif2x' => $stack['mb_avif_2x'],
                    'mb3x' => $stack['mb_webp_3x'],
                    'mbAvif3x' => $stack['mb_avif_3x'],
                    'mbTiny' => $stack['mb_tiny'],
                ],

                'alt' => [
                    'ru' => $stack['alt_ru'],
                    'en' => $stack['alt_en'],
                ],
            ]
        ];
    }
}
