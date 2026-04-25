<?php

namespace Http\Resources;

class VideoResource
{
    protected function to_resource($video)
    {
        return [
            'id' => $video['id'],
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
                    'dkTiny' => $video['dk_tiny'],
                    'tb' => $video['tb_webp'],
                    'tbAvif' => $video['tb_avif'],
                    'tb2x' => $video['tb_webp_2x'],
                    'tbAvif2x' => $video['tb_avif_2x'],
                    'tb3x' => $video['tb_webp_3x'],
                    'tbAvif3x' => $video['tb_avif_3x'],
                    'tbTiny' => $video['tb_tiny'],
                    'mb' => $video['mb_webp'],
                    'mbAvif' => $video['mb_avif'],
                    'mb2x' => $video['mb_webp_2x'],
                    'mbAvif2x' => $video['mb_avif_2x'],
                    'mb3x' => $video['mb_webp_3x'],
                    'mbAvif3x' => $video['mb_avif_3x'],
                    'mbTiny' => $video['mb_tiny'],
                ],
                'alt' => [
                    'ru' => $video['alt_ru'],
                    'en' => $video['alt_en'],
                ],
            ]
        ];
    }
}
