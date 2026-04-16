<?php

namespace factories;

class FaqFactory extends Factory
{
    public function make(): array
    {
        return [
            'title_ru'   => $this->fakerRu->words(4, true),
            'title_en'   => $this->fakerEn->words(4, true),
            'content_ru' => $this->fakerRu->realText(200),
            'content_en' => $this->fakerEn->realText(200),
        ];
    }
}
