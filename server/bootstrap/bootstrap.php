<?php

declare(strict_types=1);

use DB\SQL;

require dirname(__DIR__) . '/vendor/autoload.php';

$f3 = Base::instance();
$f3->set('DEBUG', 3);
$f3->set('DB', new SQL('sqlite:' . dirname(__DIR__) . '/db/database.sqlite'));

foreach (glob(dirname(__DIR__) . '/resources/routes/*.php') as $route) {
    require_once $route;
}

$f3->run();
