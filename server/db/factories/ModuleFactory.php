<?php

namespace factories;

use Enums\ModuleType;

class ModuleFactory extends Factory
{
    public function make(): array
    {
        $types = ModuleType::cases();
        $randomType = $types[array_rand($types)]->value;
        
        return [
            'heading_ru' => $this->fakerRu->words(4, true),
            'heading_en' => $this->fakerEn->words(4, true),
            'body_ru' => $this->fakerRu->realText(200),
            'body_en' => $this->fakerEn->realText(200),
            'html_ru' => '<div>' . $this->fakerRu->realText(200) . '</div>',
            'html_en' => '<div>' . $this->fakerEn->realText(200) . '</div>',
            'type' => $randomType,
            'priority' => $this->fakerEn->numberBetween(1, 10),
            'project_id' => null,
        ];
    }
}
