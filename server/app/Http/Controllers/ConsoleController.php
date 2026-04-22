<?php

namespace Http\Controllers;


class ConsoleController
{
    function migrate($f3)
    {
        $files = glob(APP_DIR . '/db/migrations/*');
        sort($files);

        foreach ($files as $file) {
            $sql = file_get_contents($file);
            $f3->get('DB')->exec(trim($sql));
        }

        echo "Migration completed.\n";
    }

    function drop($f3)
    {
        $tables = get_db_table_names();

        foreach ($tables as $table) {
            if (str_contains($table, 'view')) {
                $f3->get('DB')->exec("DROP VIEW IF EXISTS $table;");
            } else {
                $f3->get('DB')->exec("DROP TABLE IF EXISTS $table;");
            }
        }

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
