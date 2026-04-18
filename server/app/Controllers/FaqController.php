<?php

namespace Controllers;

use Support\Validator;

class FaqController
{
    private function toResource($faq)
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

    public function index($f3)
    {
        $faqs = $f3->get('DB')->exec('select * from faqs');

        $faqs = [
            'data' => array_map(
                fn($faq) => $this->toResource($faq),
                $faqs
            )
        ];

        json($faqs);
    }

    public function edit($f3)
    {
        $result = $f3->get('DB')->exec(
            '
            select * from faqs where faqs.id = ?',
            [$f3->get('PARAMS.id')]
        );

        if (empty($result)) {
            $f3->error(404, "FAQ not found");
        }

        $faq = $result[0];

        json(
            ["data" => $this->toResource($faq)]
        );
    }

    public function update($f3)
    {
        $request = json_decode(
            $f3->get('BODY'),
            true
        );
        $validator = Validator::make($request, [
            'name' => ['required']
        ]);

        if ($validator->fails()) {
            dd(json_encode(['errors' => $validator->errors()]));
        }

        $res = $validator->validated();
        dd(json_encode($res));
        dd($res['errors']);
    }
}
