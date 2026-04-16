<?php

namespace controllers;

class Faq
{

    public function index($f3)
    {
        $faqs = $f3->get('DB')->exec('select * from faqs');

        $faqs = [
            'data' => array_map(
                fn($faq) => [
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
                ],
                $faqs
            )
        ];

        json($faqs);
    }
}
