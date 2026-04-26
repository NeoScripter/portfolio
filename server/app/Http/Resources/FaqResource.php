<?php

namespace Http\Resources;

class FaqResource
{
    public static function to_resource($faq)
    {
        return [
            'id' => $faq['id'],
            'attr' => [
                'title' => [
                    'ru' => $faq['title_ru'],
                    'en' => $faq['title_en'],
                ],
                'content' => [
                    'ru' => $faq['content_ru'],
                    'en' => $faq['content_en'],
                ],
            ]
        ];
    }
}
