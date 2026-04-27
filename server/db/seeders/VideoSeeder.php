<?php

namespace seeders;

use factories\ImageFactory;
use factories\VideoFactory;

class VideoSeeder
{
    public function run($f3)
    {
        for ($i = 0; $i < 4; $i++) {
            $this->seed_one($f3);
        }
    }

    private function seed_one($f3)
    {
        $db = $f3->get('DB');
        $videos = (new VideoFactory())->makeMany(1);

        foreach ($videos as $video) {
            $db->exec(
                'INSERT INTO videos (url, title_ru, title_en) VALUES (?, ?, ?)',
                array_values($video)
            );
            $video_id = $db->lastInsertId();

            $image = (new ImageFactory())->make();
            $db->exec(
                'INSERT INTO images (imageable_id, imageable_type, variant,
                    dk_webp_3x, dk_webp_2x, dk_webp, dk_avif_3x, dk_avif_2x, dk_avif, dk_tiny,
                    tb_webp_3x, tb_webp_2x, tb_webp, tb_avif_3x, tb_avif_2x, tb_avif, tb_tiny,
                    mb_webp_3x, mb_webp_2x, mb_webp, mb_avif_3x, mb_avif_2x, mb_avif, mb_tiny,
                    alt_ru, alt_en)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                array_merge([$video_id, 'videos'], array_values($image))
            );
        }

        echo "Videos seeded.\n";
    }
}
