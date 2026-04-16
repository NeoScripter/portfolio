<?php

namespace seeders;

class FaqSeeder
{
    public function run($f3)
    {
        $fakerRu = \Faker\Factory::create('ru_RU');
        $fakerEn = \Faker\Factory::create('en_US');

        $values = [];
        for ($i = 0; $i < 10; $i++) {
            $values[] = [
                ':title_ru'   => $fakerRu->words(4, true),
                ':title_en'   => $fakerEn->words(4, true),
                ':content_ru' => $fakerRu->realText(200),
                ':content_en' => $fakerEn->realText(200),
            ];
        }

        $db = $f3->get('DB');
        foreach ($values as $row) {
            $db->exec(
                'INSERT INTO faqs (title_ru, title_en, content_ru, content_en)
                VALUES (:title_ru, :title_en, :content_ru, :content_en)',
                $row
            );
        }
    }
}
