<?php

declare(strict_types=1);

namespace Support;

use Base;
use RuntimeException;

class ImageHandler
{
    private string $upload_dir;
    private array $file;

    protected function __construct(
        private array &$data,
        private string $key,
        private array $variants,
        string $subdir = '',
    ) {
        if (! isset($this->data[$this->key])) {
            throw new RuntimeException("The key does not exist in the data array: $this->key");
        }
        $this->file = $this->data[$this->key];
        $this->upload_dir = APP_DIR . '/public/storage/uploads/' . $subdir;
        unset($this->data[$this->key]);

        if (!is_dir($this->upload_dir) && !mkdir($this->upload_dir, 0755, recursive: true)) {
            throw new RuntimeException("Failed to create directory: $this->upload_dir");
        }
    }

    public static function make(array &$data, string $key, array $variants, string $subdir)
    {
        return new self($data, $key, $variants, $subdir);
    }

    public function resize_all()
    {
        foreach ($this->variants as [$key, $width, $format]) {
            $this->data[$key] = $this->resize_image($width, $format);
        }
    }

    private function resize_image(
        int $width,
        ?string $format = 'webp',
    ): string {
        $filename = $this->generate_filename();
        $source = $this->file['tmp_name'];

        $dest = "{$this->upload_dir}/{$filename}.{$format}";
        $quality = $format === 'webp' ? 75 : 50;

        $src_arg  = escapeshellarg($source);
        $dest_arg = escapeshellarg($dest);

        $cmd = "convert {$src_arg} -resize '{$width}x>' -strip -quality {$quality} {$dest_arg}";

        exec($cmd, output: $output, result_code: $code);

        if ($code !== 0) {
            throw new RuntimeException(
                "convert failed for variant '{$filename}': " . implode("\n", $output)
            );
        }

        return str_replace(APP_DIR . '/public/', Base::instance()->get('app.url'), $dest);
    }

    private function generate_filename(): string
    {
        $name = pathinfo($this->file['name'], PATHINFO_FILENAME);
        $slug = preg_replace('/[^a-z0-9]+/', '-', strtolower($name));
        $slug = trim($slug, '-');
        return $slug . '-' . substr(uniqid(), -6);
    }
}
