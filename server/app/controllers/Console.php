<?php

namespace controllers;

class Console
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
        echo "All tables deleted.\n";
    }

    function fresh($f3)
    {
        $this->drop($f3);
        $this->migrate($f3);
    }
}
