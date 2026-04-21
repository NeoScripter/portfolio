<?php

namespace Controllers;

class ConsoleController
{
    private function execSql($f3, string $file): void
    {
        $sql = file_get_contents($f3->get('ROOT') . '/db/migrations/' . $file);

        $statements = array_filter(
            array_map('trim', explode(';', $sql)),
            'strlen'
        );

        foreach ($statements as $statement) {
            $f3->get('DB')->exec($statement);
        }
    }

    function migrate($f3)
    {
        $this->execSql($f3, 'migrate.sql');
        echo "Migration completed.\n";
    }

    function drop($f3)
    {
        $this->execSql($f3, 'drop.sql');

        delete_files_recursive(
            glob(APP_DIR . '/public/storage/uploads' . '/*')
        );
        
        echo "All tables deleted.\n";
    }

    function fresh($f3)
    {
        $this->drop($f3);
        $this->migrate($f3);
    }

    public function link()
    {
        $storage = APP_DIR  . '/storage/public';
        $link    = APP_DIR  . '/public/storage';

        if (file_exists($link)) {
            echo "Link already exists at {$link}" . PHP_EOL;
            return;
        }

        if (!is_dir($storage)) {
            echo "Storage directory does not exist: {$storage}" . PHP_EOL;
            return;
        }

        if (symlink($storage, $link)) {
            echo "Symlink created: {$link} -> {$storage}" . PHP_EOL;
        } else {
            echo "Failed to create symlink" . PHP_EOL;
        }
    }
}
