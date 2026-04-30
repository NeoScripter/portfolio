<?php

namespace seeders;

use factories\FaqFactory;

class FaqSeeder
{
    public function run($f3)
    {

        $values = new FaqFactory()->makeMany(8);

        $db = $f3->get('DB');

        foreach ($values as $row) {
            $db->exec(
                'INSERT INTO faqs (title_ru, title_en, content_ru, content_en)
                VALUES (?, ?, ?, ?)',
                array_values($row)
            );
        }

        echo "Faqs seeded.\n";
    }
}
