<?php

namespace Jobs;

use Base;
use DB\SQL\Mapper;
use Support\ImageHandler;

class ProcessImageJob
{
    private \Log $logger;

    public function handle(array $payload): void
    {
        $f3 = Base::instance();
        $this->logger = new \Log('../storage/logs/worker.log');

        echo "[ProcessImageJob] Starting for {$payload['parent_type']} #{$payload['parent_id']}\n";

        $data = array_merge($payload['data'], [
            'image' => [
                'tmp_name' => $payload['tmp_path'],
                'name'     => $payload['original_name'],
            ],
        ]);

        $handler = ImageHandler::make($data, 'image', $payload['sizes'], $payload['subdir']);

        if (isset($data['mockup'])) {
            echo "[ProcessImageJob] Inserting mockup #{$data['mockup']}\n";
            $handler->insert_mockup($data['mockup']);
        }

        echo "[ProcessImageJob] Resizing images\n";
        $handler->resize_all();

        if (file_exists($payload['tmp_path'])) {
            unlink($payload['tmp_path']);
        }

        if ($handler->fails()) {
            $msg = 'ImageHandler failed: ' . $handler->error();
            $this->logger->write($msg);
            throw new \RuntimeException($msg);
        }

        echo "[ProcessImageJob] Saving image record to database\n";

        ImageHandler::delete_morph_images(
            $payload['parent_id'],
            $payload['parent_type'],
            limit: 1,
            cascade: true,
            where: $data['where'] ?? ''
        );

        $output = array_merge(
            $handler->output(),
            [
                'imageable_id'   => $payload['parent_id'],
                'imageable_type' => $payload['parent_type'],
            ]
        );

        $img = new Mapper($f3->get('DB'), 'images');
        $img->copyFrom($output);
        $img->save();

        echo "[ProcessImageJob] Done for {$payload['parent_type']} #{$payload['parent_id']}\n";
    }
}
