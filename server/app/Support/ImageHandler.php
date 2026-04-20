<?php

declare(strict_types=1);

namespace Support;

use Base;
use RuntimeException;
use Imagick;
use ImagickException;

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

    public static function purge_files(string $table, array $keys, int $id)
    {
        $values = implode(
            ', ',
            $keys
        );

        $row = Base::instance()->get('DB')->exec(
            "SELECT $values FROM $table WHERE id = ? LIMIT 1",
            [$id]
        );

        if (empty($row)) {
            return;
        }

        foreach ($keys as $key) {
            if (! isset($row[0][$key])) {
                continue;
            }

            $old_path = APP_DIR . '/public/' . $row[0][$key];
            if (file_exists($old_path)) {
                unlink($old_path);
            }
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

        try {
            $img = new \Imagick($source);

            $img->resizeImage($width, 0, \Imagick::FILTER_LANCZOS, 1);

            $img->stripImage();

            $img->setImageFormat($format);
            $img->setImageCompressionQuality($quality);

            $img->writeImage($dest);
            $img->destroy();
        } catch (\ImagickException $e) {
            throw new RuntimeException(
                "Imagick failed for variant '{$filename}': " . $e->getMessage()
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
