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
    $sizes = array_map(
        fn($size) => count($size) > 1 ? $size : [$size[0], 0],
        $sizes
    );
    $variants = [];
    $formats  = ['webp', 'avif'];
    $scales   = [1, 2, 3];

    foreach ($sizes as $idx => [$name, $width]) {
        foreach ($formats as $format) {
            foreach ($scales as $scale) {
                $suffix     = $scale > 1 ? "_{$scale}x" : '';
                $variants[] = ["{$name}_{$format}{$suffix}", $width * $scale, $format];
            }
        }

        $variants[] = ["{$name}_tiny", 10 * ($idx + 2), 'webp'];
    }

    return $variants;
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

function convert_to_plural($word)
{
    $word = strtolower($word);

    // Already plural
    if (str_ends_with($word, 's')) {
        return $word;
    }

    // Consonant + Y → change to IES
    if (preg_match('/[^aeiou]y$/', $word)) {
        return substr($word, 0, -1) . 'ies';
    }

    // Vowel + Y or anything else → just add S
    return $word . 's';
}

function convert_to_snake_case($word)
{
    return strtolower(preg_replace('/(?<!^)(?=[A-Z])/', '_', $word));
}

function to_wildcards(array $arr, ?string $placeholder = '?')
{
    return implode(
        ',',
        array_fill(0, count($arr), $placeholder)
    );
}

function get_latest_id(string $table): int
{
    $res = Base::instance()->get('DB')->exec("SELECT MAX(id) AS max_id FROM {$table}");
    return $res[0]['max_id'] ?? 1;
}

function validate_required(array &$data, string $field, array &$errors)
{
    if (! isset($data[$field]) || empty($data[$field])) {
        $errors[$field] = 'This field is required';
    }
}
