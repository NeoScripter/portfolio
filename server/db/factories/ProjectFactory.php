<?php

namespace factories;

class ProjectFactory extends Factory
{
    public function make(): array
    {
        return [
            'title_ru' => $this->fakerRu->words(3, true),
            'title_en' => $this->fakerEn->words(3, true),
            'description_ru' => $this->fakerRu->realText(200),
            'description_en' => $this->fakerEn->realText(200),
            'priority' => $this->fakerEn->numberBetween(1, 100),
            'mockup' => $this->fakerEn->numberBetween(0, 1),
            'slug' => $this->fakerEn->slug(3),
            'link' => $this->fakerEn->url(),
            'category_id' => null,
        ];
    }
}
