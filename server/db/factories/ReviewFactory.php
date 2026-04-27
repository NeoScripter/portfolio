<?php

namespace factories;

class ReviewFactory extends Factory
{
    public function make(): array
    {
        return [
            'name_ru'    => $this->fakerRu->name(),
            'name_en'    => $this->fakerEn->name(),
            'content_ru' => $this->fakerRu->realText(300),
            'content_en' => $this->fakerEn->realText(300),
        ];
    }
}
