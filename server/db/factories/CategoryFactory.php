<?php

namespace factories;

class CategoryFactory extends Factory
{
    public function make(): array
    {
        return [
            'name_ru' => $this->fakerRu->unique()->words(3, true),
            'name_en' => $this->fakerEn->unique()->words(3, true)
        ];
    }
}
