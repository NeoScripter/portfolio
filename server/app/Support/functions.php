<?php

use League\CommonMark\CommonMarkConverter;

function send_json(array $data, int $status = 200): void
{
    header('Content-Type: application/json');

    http_response_code($status);

    echo json_encode($data);

    exit;
}

function get_json()
{
    $raw = Base::instance()->get('BODY');

    if (!$raw) return [];

    $data = json_decode($raw, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        send_json(['error' => 'Invalid JSON'], 400);
    }

    return $data;
}

function dd(...$vars)
{
    foreach ($vars as $v) {
        echo "<pre>";
        var_dump($v);
        echo "</pre>";
    }
    die(1);
}

function to_markdown(?string $text): string
{
    if (empty($text)) return '';

    $converter = new CommonMarkConverter([
        'html_input'         => 'strip',
        'allow_unsafe_links' => false,
        'max_nesting_level'  => 5,
    ]);

    return $converter->convert($text)->getContent();
}

function duplicate_array(array $arr)
{
    return array_map(
        fn($val) => [
            ...$val,
            'id' => uniqid()
        ],
        array_merge($arr, $arr)
    );
}

function split_data(array $data, ?string $imageable_type = null)
{
    $img_fields = ['dk_webp', 'dk_avif', 'dk_webp_2x', 'dk_avif_2x', 'dk_webp_3x', 'dk_avif_3x', 'tb_webp', 'tb_avif', 'tb_webp_2x', 'tb_avif_2x', 'tb_webp_3x', 'tb_avif_3x', 'mb_webp', 'mb_avif', 'mb_webp_2x', 'mb_avif_2x', 'mb_webp_3x', 'mb_avif_3x', 'tiny', 'alt_ru', 'alt_en', 'imageable_type', 'variant']; // pint ignore/line

    $img_data = [];

    if ($imageable_type != null) {
        $img_data['imageable_type'] = $imageable_type;
    }

    $entry_data = [];

    foreach ($data as $key => $val) {
        if (in_array($key, $img_fields)) {
            $img_data[$key] = $val;
        } else {
            $entry_data[$key] = $val;
        }
    }

    return [$entry_data, $img_data];
}

function delete_files_recursive(array $files)
{
    foreach ($files as $file) {
        if (is_file($file)) {
            unlink($file);
        } else if (is_dir($file)) {
            delete_files_recursive(glob($file . '/*'));
            rmdir($file);
        }
    }
}
