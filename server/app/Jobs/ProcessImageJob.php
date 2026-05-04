<?php

namespace Jobs;

use Base;
use DB\SQL\Mapper;
use Support\ImageHandler;

class ProcessImageJob
{
    public function handle(array $payload): void
    {
        $f3 = Base::instance();

        $parent_id   = $payload['parent_id'];
        $parent_type = $payload['parent_type'];
        $mockup      = (int) $payload['mockup'];
        $subdir      = $payload['subdir'];
        $sizes       = $payload['sizes'];
        $extra       = $payload['extra'] ?? [];

        // Reconstruct a $_FILES-style array from the persisted temp file
        $file_data = [
            'image' => [
                'tmp_name' => $payload['tmp_path'],
                'name'     => $payload['original_name'],
                'type'     => $payload['mime_type'],
                'size'     => filesize($payload['tmp_path']),
                'error'    => UPLOAD_ERR_OK,
            ],
        ];

        $handler = ImageHandler::make($file_data, 'image', $sizes, $subdir)
            ->insert_mockup($mockup)
            ->resize_all();

        // Clean up the persisted temp file regardless of outcome
        if (file_exists($payload['tmp_path'])) {
            unlink($payload['tmp_path']);
        }

        if ($handler->fails()) {
            throw new \RuntimeException('ImageHandler failed: ' . $handler->error());
        }

        $output = $handler->output();

        $output['imageable_id']   = $parent_id;
        $output['imageable_type'] = $parent_type;

        // Merge any extra fields (alt_en, alt_ru, etc.)
        $output = array_merge($output, $extra);

        $img = new Mapper($f3->get('DB'), 'images');
        $img->copyFrom($output);
        $img->save();
    }
}
