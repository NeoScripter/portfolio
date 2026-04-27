<?php

namespace factories;

class ImageFactory extends Factory
{
    public function make(): array
    {
        return [
            'variant' => 'image',
            
            'dk_webp_3x' => 'https://placehold.co/1700@3x.webp?text=dk+1700px',
            'dk_webp_2x' => 'https://placehold.co/1700@2x.webp?text=dk+1700px',
            'dk_webp' => 'https://placehold.co/1700.webp?text=dk+1700px',
            'dk_avif_3x' => 'https://placehold.co/1700@3x.avif?text=dk+1700px',
            'dk_avif_2x' => 'https://placehold.co/1700@2x.avif?text=dk+1700px',
            'dk_avif' => 'https://placehold.co/1700.avif?text=dk+1700px',
            'dk_tiny' => 'https://placehold.co/20.webp?text=tiny',
            
            'tb_webp_3x' => 'https://placehold.co/1000@3x.webp?text=tb+1000px',
            'tb_webp_2x' => 'https://placehold.co/1000@2x.webp?text=tb+1000px',
            'tb_webp' => 'https://placehold.co/1000.webp?text=tb+1000px',
            'tb_avif_3x' => 'https://placehold.co/1000@3x.avif?text=tb+1000px',
            'tb_avif_2x' => 'https://placehold.co/1000@2x.avif?text=tb+1000px',
            'tb_avif' => 'https://placehold.co/1000.avif?text=tb+1000px',
            'tb_tiny' => 'https://placehold.co/20.webp?text=tiny',
            
            'mb_webp_3x' => 'https://placehold.co/520@3x.webp?text=mb+520px',
            'mb_webp_2x' => 'https://placehold.co/520@2x.webp?text=mb+520px',
            'mb_webp' => 'https://placehold.co/520.webp?text=mb+520px',
            'mb_avif_3x' => 'https://placehold.co/520@3x.avif?text=mb+520px',
            'mb_avif_2x' => 'https://placehold.co/520@2x.avif?text=mb+520px',
            'mb_avif' => 'https://placehold.co/520.avif?text=mb+520px',
            'mb_tiny' => 'https://placehold.co/20.webp?text=tiny',
            
            'alt_ru' => $this->fakerRu->words(3, true),
            'alt_en' => $this->fakerEn->words(3, true),
        ];
    }
}
