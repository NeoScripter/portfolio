<?php

namespace Http\Resources;

class ProjectResource
{
    protected function to_resource($project)
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
}
