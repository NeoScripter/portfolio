<?php

namespace Controllers;

use Support\DBHandler;
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

        send_json($faqs);
    }

    public function edit($f3)
    {
        $result = $f3->get('DB')->exec(
            '
            select * from faqs where faqs.id = ?',
            [$f3->get('PARAMS.id')]
        );

        if (empty($result)) {
            send_json(['message' =>  "FAQ not found"], 404);
            $f3->error(404, "FAQ not found");
        }

        $faq = $result[0];

        send_json(
            ["data" => $this->toResource($faq)]
        );
    }

    public function store()
    {
        $validator = Validator::make(get_json(), [
            'title_en' => ['required', 'string', 'min:3', 'max:255'],
            'title_ru' => ['required', 'string', 'min:3', 'max:255'],
            'content_en' => ['nullable', 'string', 'min:3', 'max:2255'],
            'content_ru' => ['nullable', 'string', 'min:3', 'max:2255'],
        ]);

        if ($validator->fails()) {
            send_json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        $db_handler = DBHandler::make($data);
        $db_handler->create_entry('faqs');

        send_json(['message' => 'Faq successfully created!']);
    }

    public function update($f3)
    {
        $validator = Validator::make(get_json(), [
            'title_en' => ['sometimes', 'string', 'min:3', 'max:255'],
            'title_ru' => ['sometimes', 'string', 'min:3', 'max:255'],
            'content_en' => ['sometimes', 'string', 'min:3', 'max:2255'],
            'content_ru' => ['sometimes', 'string', 'min:3', 'max:2255'],
        ]);

        if ($validator->fails()) {
            send_json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        $db_handler = DBHandler::make($data);
        $db_handler->update_entry('faqs', (int) $f3->get('PARAMS.id'));

        send_json(['message' => 'Faq successfully updated!']);
    }

    public function destroy($f3)
    {
        $affected = $f3->get('DB')->exec(
            '
            delete from faqs where faqs.id = ?',
            [$f3->get('PARAMS.id')]
        );

        if (!$affected) {
            send_json(['message' => 'FAQ not found'], 422);
        }

        send_json(['message' => 'Faq successfully deleted!']);
    }
}
