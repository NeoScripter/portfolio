<?php

namespace factories;

class TechStackFactory extends Factory
{
    public function make(): array
    {
        return [
            'url' => $this->fakerEn->url(),
            'alt_ru' => $this->fakerRu->words(3, true),
            'alt_en' => $this->fakerEn->words(3, true),
            'body_ru' => $this->fakerRu->realText(150),
            'body_en' => $this->fakerEn->realText(150),
            'html_ru' => '<p>' . $this->fakerRu->realText(150) . '</p>',
            'html_en' => '<p>' . $this->fakerEn->realText(150) . '</p>',
        ];
    }
}
