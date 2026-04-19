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
