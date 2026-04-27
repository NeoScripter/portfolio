<?php

namespace Http\Resources;

class ModuleResource
{
    public static function to_resource($module)
    {
        return [
            'id' => $module['id'],
            'attr' => [
                'heading' => [
                    'ru' => $module['heading_ru'],
                    'en' => $module['heading_en'],
                ],
                'body' => [
                    'ru' => $module['body_ru'],
                    'en' => $module['body_en'],
                ],
                'html' => [
                    'ru' => $module['html_ru'],
                    'en' => $module['html_en'],
                ],
                'priority' => $module['priority'],
                'type' => $module['type'],
            ],
            'firstImage' => [

                'srcSet' => [
                    'tb' => $module['first_tb_webp'],
                    'tbAvif' => $module['first_tb_avif'],
                    'tb2x' => $module['first_tb_webp_2x'],
                    'tbAvif2x' => $module['first_tb_avif_2x'],
                    'tb3x' => $module['first_tb_webp_3x'],
                    'tbAvif3x' => $module['first_tb_avif_3x'],
                    'tbTiny' => $module['first_tb_tiny'],

                    'mb' => $module['first_mb_webp'],
                    'mbAvif' => $module['first_mb_avif'],
                    'mb2x' => $module['first_mb_webp_2x'],
                    'mbAvif2x' => $module['first_mb_avif_2x'],
                    'mb3x' => $module['first_mb_webp_3x'],
                    'mbAvif3x' => $module['first_mb_avif_3x'],
                    'mbTiny' => $module['first_mb_tiny'],
                ],
                'alt' => [
                    'ru' => $module['first_alt_ru'],
                    'en' => $module['first_alt_en'],
                ],
            ],
            'secondImage' => [

                'srcSet' => [
                    'tb' => $module['second_tb_webp'],
                    'tbAvif' => $module['second_tb_avif'],
                    'tb2x' => $module['second_tb_webp_2x'],
                    'tbAvif2x' => $module['second_tb_avif_2x'],
                    'tb3x' => $module['second_tb_webp_3x'],
                    'tbAvif3x' => $module['second_tb_avif_3x'],
                    'tbTiny' => $module['second_tb_tiny'],

                    'mb' => $module['second_mb_webp'],
                    'mbAvif' => $module['second_mb_avif'],
                    'mb2x' => $module['second_mb_webp_2x'],
                    'mbAvif2x' => $module['second_mb_avif_2x'],
                    'mb3x' => $module['second_mb_webp_3x'],
                    'mbAvif3x' => $module['second_mb_avif_3x'],
                    'mbTiny' => $module['second_mb_tiny'],
                ],
                'alt' => [
                    'ru' => $module['second_alt_ru'],
                    'en' => $module['second_alt_en'],
                ]
            ]
        ];
    }
}
