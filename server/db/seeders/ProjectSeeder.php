<?php

namespace seeders;

use factories\CategoryFactory;
use factories\ImageFactory;
use factories\ModuleFactory;
use factories\ProjectFactory;
use factories\TechStackFactory;
use Enums\ModuleType;

class ProjectSeeder
{
    public function run($f3)
    {
        for ($i = 0; $i < 8; $i++) {
            $this->seed_one($f3);
        }
    }

    private function seed_one($f3)
    {
        $db = $f3->get('DB');

        // Category
        $category = (new CategoryFactory())->make();
        $db->exec(
            'INSERT INTO categories (name_ru, name_en) VALUES (?, ?)',
            [$category['name_ru'], $category['name_en']]
        );
        $category_id = $db->lastInsertId();

        // Project
        $project = (new ProjectFactory())->make();
        $project['category_id'] = $category_id;
        $db->exec(
            'INSERT INTO projects (title_ru, title_en, description_ru, description_en, priority, mockup, slug, link, category_id)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            array_values($project)
        );
        $project_id = $db->lastInsertId();

        // Project image
        $image = (new ImageFactory())->make();
        $db->exec(
            'INSERT INTO images (imageable_id, imageable_type, variant,
                dk_webp_3x, dk_webp_2x, dk_webp, dk_avif_3x, dk_avif_2x, dk_avif, dk_tiny,
                tb_webp_3x, tb_webp_2x, tb_webp, tb_avif_3x, tb_avif_2x, tb_avif, tb_tiny,
                mb_webp_3x, mb_webp_2x, mb_webp, mb_avif_3x, mb_avif_2x, mb_avif, mb_tiny,
                alt_ru, alt_en)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            array_merge([$project_id, 'projects'], array_values($image))
        );

        // Technologies
        for ($i = 0; $i < 3; $i++) {
            $tech = (new TechStackFactory())->make();
            $name = $tech['alt_en'];
            $db->exec(
                'INSERT INTO technologies (name) VALUES (?) ON CONFLICT (name) DO NOTHING',
                [$name]
            );
            $res = $db->exec('SELECT id FROM technologies WHERE name = ?', [$name]);
            $tech_id = $res[0]['id'];
            $db->exec(
                'INSERT INTO project_technology (project_id, technology_id) VALUES (?, ?) ON CONFLICT DO NOTHING',
                [$project_id, $tech_id]
            );
        }

        // Modules — one of each type
        $types = array_map(fn($case) => $case->value, ModuleType::cases());

        foreach ($types as $idx => $type) {
            $module = (new ModuleFactory())->make();
            $module['type'] = $type;
            $module['project_id'] = $project_id;
            $module['priority'] = $idx + 1;

            $db->exec(
                'INSERT INTO modules (heading_ru, heading_en, body_ru, body_en, html_ru, html_en, type, priority, project_id)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    $module['heading_ru'],
                    $module['heading_en'],
                    $module['body_ru'],
                    $module['body_en'],
                    $module['html_ru'],
                    $module['html_en'],
                    $module['type'],
                    $module['priority'],
                    $module['project_id'],
                ]
            );
            $module_id = $db->lastInsertId();

            // All types except only_text get a first image
            if ($type !== 'only_text') {
                $first = (new ImageFactory())->make();
                $db->exec(
                    'INSERT INTO images (imageable_id, imageable_type, variant,
                        dk_webp_3x, dk_webp_2x, dk_webp, dk_avif_3x, dk_avif_2x, dk_avif, dk_tiny,
                        tb_webp_3x, tb_webp_2x, tb_webp, tb_avif_3x, tb_avif_2x, tb_avif, tb_tiny,
                        mb_webp_3x, mb_webp_2x, mb_webp, mb_avif_3x, mb_avif_2x, mb_avif, mb_tiny,
                        alt_ru, alt_en)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    array_merge([$module_id, 'modules', 'first_image'], array_slice(array_values($first), 1))
                );
            }

            // Two-image types get a second image
            if (in_array($type, ['two_image_split', 'two_image_block'])) {
                $second = (new ImageFactory())->make();
                $db->exec(
                    'INSERT INTO images (imageable_id, imageable_type, variant,
                        dk_webp_3x, dk_webp_2x, dk_webp, dk_avif_3x, dk_avif_2x, dk_avif, dk_tiny,
                        tb_webp_3x, tb_webp_2x, tb_webp, tb_avif_3x, tb_avif_2x, tb_avif, tb_tiny,
                        mb_webp_3x, mb_webp_2x, mb_webp, mb_avif_3x, mb_avif_2x, mb_avif, mb_tiny,
                        alt_ru, alt_en)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    array_merge([$module_id, 'modules', 'second_image'], array_slice(array_values($second), 1))
                );
            }
        }

        echo "Project seeded with category, image, 3 technologies, and " . count($types) . " modules.\n";
    }
}
