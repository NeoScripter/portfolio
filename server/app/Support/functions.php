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

function add_markdown_field(array &$data, string $from, string $to)
{
    if (! isset($data[$from]) || ! is_string($data[$from])) {
        return;
    }

    $data[$to] = \Markdown::instance()->convert($data[$from]);
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

function image_variants(array $sizes): array
{
    $variants = [['tiny', 20, 'webp']];
    $formats  = ['webp', 'avif'];
    $scales   = [1, 2, 3];

    foreach ($sizes as [$name, $width]) {
        foreach ($formats as $format) {
            foreach ($scales as $scale) {
                $suffix     = $scale > 1 ? "_{$scale}x" : '';
                $variants[] = ["{$name}_{$format}{$suffix}", $width * $scale, $format];
            }
        }
    }

    return $variants;
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

function get_db_table_names()
{
    $files = glob(APP_DIR . '/db/migrations/*');
    sort($files);

    return array_filter(
        array_map(
            function ($file) {
                $filename = basename($file);

                if (preg_match('/create_([a-z_]+)_table/', $filename, $matches)) {
                    return $matches[1];
                }

                return '';
            },
            $files
        ),
        'strlen'
    );
}

function generate_slug($string, $wordLimit = 0)
{
    $separator = '-';

    // Apply word limit if needed
    if ($wordLimit != 0) {
        $words      = explode(' ', $string);
        $string     = implode(' ', array_slice($words, 0, $wordLimit));
    }

    $quoteSeparator = preg_quote($separator, '#');

    // Regex transformation rules
    $transformations = [
        '&.+?;'                      => '',           // Strip HTML entities
        '[^\w\d _-]'                 => '',           // Remove special chars
        '\s+'                        => $separator,   // Spaces to separator
        '(' . $quoteSeparator . ')+' => $separator    // Collapse multiple separators
    ];

    $string = strip_tags($string);

    foreach ($transformations as $pattern => $replacement) {
        $string = preg_replace('#' . $pattern . '#iu', $replacement, $string);
    }

    $string = strtolower($string);

    return trim($string, $separator);
}

function pp($arr)
{
    if (!is_array($arr)) {
        return $arr;
    }
    if (empty($arr)) {
        return '[]';
    }

    // Detect 2D grid: array of arrays with consistent numeric keys
    $is2DGrid = array_is_list($arr) && count(array_filter($arr, fn($row) => is_array($row) && array_is_list($row))) === count($arr);

    if ($is2DGrid) {
        // Find the max string length of any cell for alignment
        $colWidths = [];
        foreach ($arr as $row) {
            foreach ($row as $colIdx => $val) {
                $len = strlen((string) $val);
                if (!isset($colWidths[$colIdx]) || $len > $colWidths[$colIdx]) {
                    $colWidths[$colIdx] = $len;
                }
            }
        }

        $lines = [];
        foreach ($arr as $row) {
            $cells = [];
            foreach ($row as $colIdx => $val) {
                $cells[] = str_pad((string) $val, $colWidths[$colIdx], ' ', STR_PAD_LEFT);
            }
            $lines[] = '[ ' . implode(', ', $cells) . ' ]';
        }

        $width = strlen($lines[0]);
        $separator = str_repeat('-', $width);

        return $separator . "\n" . implode("\n", $lines) . "\n" . $separator;
    }

    // Original flat array logic
    $result = '[';
    $elements = [];
    foreach ($arr as $val) {
        $elements[] = is_array($val) ? pp($val) : $val;
    }
    $result .= implode(', ', $elements);
    $result .= ']';
    return $result;
}
