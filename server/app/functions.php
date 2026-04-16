<?php

function json(array $data): void
{
    header('Content-Type: application/json');
    echo json_encode($data);
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
