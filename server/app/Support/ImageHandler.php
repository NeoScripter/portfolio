<?php

declare(strict_types=1);

namespace Support;

use Base;
use RuntimeException;
use Imagick;
use ImagickException;

class ImageHandler
{
    private array $sizes = [
        ['dk_webp', 1700, 'webp'],
        ['dk_avif', 1700, 'avif'],
        ['dk_webp_2x', 3400, 'webp'],
        ['dk_avif_2x', 3400, 'avif'],
        ['dk_webp_3x', 5200, 'webp'],
        ['dk_avif_3x', 5200, 'avif'],
        ['tb_webp', 1000, 'webp'],
        ['tb_avif', 1000, 'avif'],
        ['tb_webp_2x', 2000, 'webp'],
        ['tb_avif_2x', 2000, 'avif'],
        ['tb_webp_3x', 3000, 'webp'],
        ['tb_avif_3x', 3000, 'avif'],
        ['mb_webp', 520, 'webp'],
        ['mb_avif', 520, 'avif'],
        ['mb_webp_2x', 1040, 'webp'],
        ['mb_avif_2x', 1040, 'avif'],
        ['mb_webp_3x', 1560, 'webp'],
        ['mb_avif_3x', 1560, 'avif'],
        ['tiny', 20, 'webp'],
    ];

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

    public static function purge_files(string $table, array $keys, int $id, ?string $parent_type = null)
    {
        $values = implode(
            ', ',
            $keys
        );

        if ($parent_type != null) {
            $row = Base::instance()->get('DB')->exec(
                "SELECT $values FROM $table WHERE imageable_id = ? AND imageable_type = ? LIMIT 1",
                [$id, $parent_type]
            );
        } else {
            $row = Base::instance()->get('DB')->exec(
                "SELECT $values FROM $table WHERE id = ? LIMIT 1",
                [$id]
            );
        }

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
        $dest = str_replace('//', '/', $dest);
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

    public function insert_mockup(int $mockup_number, string $result_key = 'mockup_url'): void
    {
        if ($mockup_number < 1 || $mockup_number > 6) {
            throw new \InvalidArgumentException('Mockup number must be between 1 and 6');
        }

        [$crop_w, $crop_h] = $mockup_number <= 5 ? [965, 707] : [621, 854];

        $coords_map = [
            1 => [0, 0, 272, 286,   965, 0, 1240, 288,   965, 707, 1264, 967,   0, 707, 298, 1017],
            2 => [0, 0, 365, 136,   965, 0, 1368, 134,   965, 707, 1238, 857,   0, 707, 250, 932],
            3 => [0, 0, 789, 61,    965, 0, 1809, 459,   965, 707, 1571, 1220,  0, 707, 602, 780],
            4 => [0, 0, 314, 206,   965, 0, 1502, 136,   965, 707, 1472, 937,   0, 707, 320, 1076],
            5 => [0, 0, 653, 288,   965, 0, 1806, 235,   965, 707, 1779, 1170,  0, 707, 618, 1135],
            6 => [0, 0, 392, 435,   621, 0, 971, 166,    621, 854, 1462, 975,   0, 854, 872, 1282],
        ];

        $mockup_path = APP_DIR . "/public/storage/mockups/mockup-{$mockup_number}.webp";
        $filename    = $this->generate_filename();
        $dest        = "{$this->upload_dir}/{$filename}.webp";

        try {
            // step 1: crop source to mockup slot dimensions
            $img = new \Imagick($this->file['tmp_name']);
            $img->cropThumbnailImage($crop_w, $crop_h); // fill + center crop in one call
            $img->stripImage();

            // step 2: distort into perspective
            $img->setImageVirtualPixelMethod(\Imagick::VIRTUALPIXELMETHOD_TRANSPARENT);
            $img->distortImage(\Imagick::DISTORTION_PERSPECTIVE, $coords_map[$mockup_number], false);

            // step 3: composite over mockup
            $mockup = new \Imagick($mockup_path);
            $mockup->compositeImage($img, \Imagick::COMPOSITE_OVER, 0, 0);
            $mockup->setImageFormat('webp');
            $mockup->setImageCompressionQuality(75);
            $mockup->writeImage($dest);

            $img->destroy();
            $mockup->destroy();
        } catch (\ImagickException $e) {
            throw new \RuntimeException("Mockup compositing failed: " . $e->getMessage());
        }

        $this->data[$result_key] = str_replace(
            APP_DIR . '/public/',
            \Base::instance()->get('app.url'),
            $dest
        );
    }

    private function generate_filename(): string
    {
        $name = pathinfo($this->file['name'], PATHINFO_FILENAME);
        $slug = preg_replace('/[^a-z0-9]+/', '-', strtolower($name));
        $slug = trim($slug, '-');
        return $slug . '-' . substr(uniqid(), -6);
    }
}
