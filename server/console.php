<?php

$command = $argv[1] ?? null;

match ($command) {
    'migrate'       => runSqlFile($pdo, __DIR__ . '/database/migrations/migrate.sql'),
    'migrate:drop'  => runSqlFile($pdo, __DIR__ . '/database/migrations/drop.sql'),
    default         => print("Unknown command: {$command}\n"),
};

function runSqlFile(string $path): void
{
    $sql = file_get_contents($path);
    $f3->get('DB')->exec($sql);
    echo "Done.\n";
}
