<?php

namespace Http\Resources;

class CategoryResource
{
    public static function to_resource($category)
    {
        return [
            'id' => $category['id'],
            'name' => [
                'ru' => $category['name_ru'],
                'en' => $category['name_en'],
            ]
        ];
    }
}
