<?php

namespace controllers;

class Console
{
    function migrate($f3)
    {
        $sql = file_get_contents($f3->get('ROOT') . '/db/migrations/migrate.sql');
        $f3->get('DB')->exec($sql);
        echo "Migration completed.\n";
    }

    function drop($f3)
    {
        $sql = file_get_contents($f3->get('ROOT') . '/db/migrations/drop.sql');
        $f3->get('DB')->exec($sql);
        echo "Migration completed.\n";
    }
}
