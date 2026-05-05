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
    private array $output = [];
    private string $error = '';

    protected function __construct(
        private array $data,
        private string $key,
        private array $sizes,
        private string $subdir = '',
        private string $filename = 'tmp_name',
    ) {
        if (! isset($this->data[$this->key])) {
            $this->error = "The key does not exist in the data array: $this->key";
            return;
        }

        $this->file = $this->data[$this->key];
        $this->upload_dir = APP_DIR . '/public/storage/uploads/' . $subdir;
        unset($this->data[$this->key]);

        if (!is_dir($this->upload_dir) && !mkdir($this->upload_dir, 0755, recursive: true)) {
            $this->error = "Failed to create directory: $this->upload_dir";
        }
    }

    public static function make(array $data, string $key, array $variants, string $subdir = ''): static
    {
        return new self($data, $key, $variants, $subdir);
    }

    public function fails()
    {
        return $this->error !== '';
    }

    public function error()
    {
        return $this->error;
    }

    public function output(): array
    {
        return $this->output;
    }

    public function enqueue(int $parent_id, string $parent_type): static
    {
        if ($this->fails()) return $this;

        $tmp_dir = APP_DIR . '/storage/private/pending/';
        if (!is_dir($tmp_dir)) mkdir($tmp_dir, 0755, true);
        $tmp_path = $tmp_dir . uniqid('img_', true);

        if (!move_uploaded_file($this->file['tmp_name'], $tmp_path)) {
            $this->error = "Failed to move uploaded file to pending directory";
            return $this;
        }

        $queue = Base::instance()->get('JOB_QUEUE');
        $queue->selectPipeline('process_image');
        $queue->addJob(json_encode([
            'parent_id'     => $parent_id,
            'parent_type'   => $parent_type,
            'subdir'        => $parent_type,
            'sizes'         => $this->sizes,
            'tmp_path'      => $tmp_path,
            'original_name' => $this->file['name'],
            'data'         => $this->data,
            'pipeline'  => 'process_image',
        ]));

        return $this;
    }
    public function resize_all(): static
    {
        try {
            foreach (image_variants($this->sizes) as [$key, $width, $format]) {
                if ($this->fails()) {
                    return $this;
                }
                $this->data[$key] = $this->resize_image($width, $format);
            }

            $this->output = $this->data;
        } catch (RuntimeException $e) {
            $this->error = $e->getMessage();
        }

        return $this;
    }

    public function resize_one(): static
    {
        if (empty($this->sizes)) {
            $this->error = 'No sizes are given';
            return $this;
        }
        try {
            [$key, $width, $format] = array_pop($this->sizes);
            $this->data[$key] = $this->resize_image($width, $format);

            $this->output = $this->data;
        } catch (RuntimeException $e) {
            $this->error = $e->getMessage();
        }

        return $this;
    }

    public static function delete_morph_images(
        int|string $parent_id,
        string $parent_type,
        int $limit = 1,
        bool $cascade = false,
        string $where = ''
    ) {
        if (is_string($parent_id)) {
            $parent_id = (int) $parent_id;
        }

        $where = $where ? "AND $where " : '';

        $rows = Base::instance()->get('DB')->exec(
            "SELECT * FROM images WHERE imageable_id = ? AND imageable_type = ? {$where}LIMIT {$limit}",
            [$parent_id, $parent_type]
        );

        if (empty($rows)) {
            return;
        }

        $keys = array_map(
            fn($arr) => $arr[0],
            image_variants([['mb'], ['tb'], ['dk']])
        );

        foreach ($rows as $row) {
            foreach ($keys as $key) {
                if (! isset($row[$key])) {
                    continue;
                }

                $old_path = str_replace(Base::instance()->get('app_url'), APP_DIR . '/public/', $row[$key]);

                if (file_exists($old_path)) {
                    unlink($old_path);
                }
            }
        }

        if ($cascade) {
            Base::instance()->get('DB')->exec(
                "DELETE FROM images WHERE id IN (" . to_wildcards($rows) . ")",
                array_column($rows, 'id')
            );
        }
    }

    private function resize_image(
        int $width,
        ?string $format = 'webp',
    ): string {
        $source = $this->file[$this->filename];
        $filename = $this->generate_filename();
        $dest = "{$this->upload_dir}/{$filename}.{$format}";
        $dest = str_replace('//', '/', $dest);
        $quality = $format === 'webp' ? 75 : 50;

        try {
            $img = new Imagick($source);

            $img->resizeImage($width, 0, Imagick::FILTER_LANCZOS, 1);

            $img->stripImage();

            $img->setImageFormat($format);
            $img->setImageCompressionQuality($quality);

            $img->writeImage($dest);
            $img->destroy();
        } catch (ImagickException $e) {
            throw new RuntimeException(
                "Imagick failed for variant '{$this->filename}': " . $e->getMessage()
            );
        }

        return str_replace(APP_DIR . '/public/', Base::instance()->get('app_url'), $dest);
    }

    public function compress(): static
    {
        if ($this->fails()) return $this;

        $tmp_png = sys_get_temp_dir() . '/compressed_' . uniqid() . '.png';

        try {
            $img = new Imagick($this->file[$this->filename]);
            $img->stripImage();
            $img->setImageFormat('png');
            $img->writeImage($tmp_png);
            $img->destroy();

            $cmd = sprintf(
                'optipng -o7 -strip all %s',
                escapeshellarg($tmp_png)
            );

            exec($cmd, output: $output, result_code: $code);

            if ($code !== 0) {
                throw new RuntimeException('PNG compression failed: ' . implode("\n", $output));
            }

            $this->file[$this->filename] = $tmp_png;
        } catch (RuntimeException $e) {
            $this->error = $e->getMessage();
            if (file_exists($tmp_png)) unlink($tmp_png);
        } catch (ImagickException $e) {
            $this->error = 'PNG conversion failed: ' . $e->getMessage();
            if (file_exists($tmp_png)) unlink($tmp_png);
        }

        return $this;
    }

    public function insert_mockup(int $mockup_number): static
    {
        if ($this->fails()) return $this;

        if ($mockup_number < 1 || $mockup_number > 6) {
            $this->error = 'Mockup number must be between 1 and 6';
            return $this;
        }

        [$crop_w, $crop_h] = $mockup_number <= 5 ? [965, 707] : [621, 854];

        $coords_map = [
            1 => '0,0 272,286   965,0 1240,288   965,707 1264,967   0,707 298,1017',
            2 => '0,0 365,136   965,0 1368,134   965,707 1238,857   0,707 250,932',
            3 => '0,0 789,61    965,0 1809,459   965,707 1571,1220   0,707 602,780',
            4 => '0,0 314,206   965,0 1502,136   965,707 1472,937   0,707 320,1076',
            5 => '0,0 653,288   965,0 1806,235   965,707 1779,1170   0,707 618,1135',
            6 => '0,0 392,435   621,0 971,166    621,854 1462,975    0,854 872,1282',
        ];

        $mockup_path = APP_DIR . "/storage/private/mockups/mockup-{$mockup_number}.webp";
        $tmp_cropped = sys_get_temp_dir() . '/cropped_' . uniqid() . '.webp';
        $tmp_out     = sys_get_temp_dir() . '/mockup_' . uniqid() . '.webp';

        try {
            $img = new Imagick($this->file[$this->filename]);
            $img->cropThumbnailImage($crop_w, $crop_h);
            $img->stripImage();
            $img->writeImage($tmp_cropped);
            $img->destroy();

            $cmd = sprintf(
                'convert %s \( %s -virtual-pixel none +distort perspective %s \) -layers merge +repage %s',
                escapeshellarg($mockup_path),
                escapeshellarg($tmp_cropped),
                escapeshellarg($coords_map[$mockup_number]),
                escapeshellarg($tmp_out)
            );

            exec($cmd, output: $output, result_code: $code);

            if ($code !== 0) {
                throw new RuntimeException('Mockup compositing failed: ' . implode("\n", $output));
            }

            $this->file[$this->filename] = $tmp_out;
        } catch (RuntimeException $e) {
            $this->error = $e->getMessage();
        } catch (ImagickException $e) {
            $this->error = 'Crop failed: ' . $e->getMessage();
        } finally {
            if (file_exists($tmp_cropped)) unlink($tmp_cropped);
        }

        return $this;
    }

    private function generate_filename(): string
    {
        $name = pathinfo($this->file['name'], PATHINFO_FILENAME);
        $slug = preg_replace('/[^a-z0-9]+/', '-', strtolower($name));
        $slug = trim($slug, '-');
        return $slug . '-' . substr(uniqid(), -6);
    }
}
