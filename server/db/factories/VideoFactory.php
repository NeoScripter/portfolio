<?php

namespace factories;

class VideoFactory extends Factory
{
    public function make(): array
    {
        return [
            'url'      => $this->fakerEn->url(),
            'title_ru' => $this->fakerRu->words(4, true),
            'title_en' => $this->fakerEn->words(4, true),
        ];
    }
}
