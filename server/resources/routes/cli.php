<?php

$f3->route('GET /migrate [cli]', function($f3) {
    $sql = file_get_contents(dirname(__DIR__) . '/db/migrations/migrate.sql');
    $f3->get('DB')->exec($sql);
    echo "Migration completed.\n";
});

$f3->route('GET /migrate/drop [cli]', function($f3) {
    $sql = file_get_contents(dirname(__DIR__) . '/db/migrations/drop.sql');
    $f3->get('DB')->exec($sql);
    echo "Migration dropped.\n";
});
