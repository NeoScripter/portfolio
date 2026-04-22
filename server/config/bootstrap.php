<?php

declare(strict_types=1);

use DB\SQL;
use DB\SQL\Mapper;

require APP_DIR . '/vendor/autoload.php';

$f3 = Base::instance();

$f3->set('DEBUG', $f3->get('app.debug'));
$f3->set('AUTOLOAD', APP_DIR . '/app/;' . APP_DIR . '/db/');
$f3->set('DB', new SQL('sqlite:' . APP_DIR . '/db/database.sqlite'));

foreach (get_db_table_names() as $table) {
    $model = '_' . strtoupper($table);
    $mapper = new Mapper($f3->get('DB'), $table);
    $f3->set($model, $mapper);
}

$f3->set('CORS', [
    'origin'      => 'http://localhost:5173',
    'headers'     => 'Content-Type, Authorization',
    'methods'     => 'GET, POST, PUT, DELETE',
    'expose'      => '',
    'credentials' => true,
    'ttl'         => 86400
]);

require_once(APP_DIR . '/config/routing.php');

$f3->run();
