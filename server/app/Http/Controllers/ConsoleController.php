<?php

namespace Http\Controllers;


class ConsoleController
{
    function migrate($f3)
    {
        $files = glob(APP_DIR . '/db/migrations/*');
        sort($files);

        $pdo = $f3->get('DB')->pdo();

        foreach ($files as $file) {
            $sql = file_get_contents($file);
            $pdo->exec($sql);
        }

        echo "Migration completed.\n";
    }

    function drop($f3)
    {
        $tables = get_db_table_names();

        foreach ($tables as $table) {
            if (str_contains($table, '_view')) {
                $f3->get('DB')->exec("DROP VIEW IF EXISTS $table CASCADE;");
            } else {
                $f3->get('DB')->exec("DROP TABLE IF EXISTS $table CASCADE;");
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

    function link()
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

    function create_user($f3)
    {
        $name = $f3->get('GET.name');
        $email = $f3->get('GET.email');
        $password = $f3->get('GET.password');

        if (empty($name) || empty($email) || strlen($password) < 8) {
            cli_echo("❌ Usage: php index.php create_user --name=John --email=john@example.com --password=mypassword123", 'error');
            cli_echo("   Password must be at least 8 characters", 'error');
            exit(1);
        }

        $hash = password_hash($password, PASSWORD_DEFAULT);

        if ($hash === false) {
            cli_echo("❌ Failed to hash password", 'error');
            exit(1);
        }

        try {
            $user = $f3->get('_USERS');
            $user->copyFrom(['name' => $name, 'email' => $email, 'password' => $hash]);
            $user->save();

            cli_echo("User created successfully!");
            cli_echo("   ID: {$user->id}");
            cli_echo("   Name: $name");
            cli_echo("   Email: $email");
        } catch (\Exception $e) {
            cli_echo("❌ Failed: {$e->getMessage()}", 'error');
            exit(1);
        }
    }
}
