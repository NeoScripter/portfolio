<?php

declare(strict_types=1);

use DB\SQL;

define('APP_DIR', dirname(__DIR__));

require APP_DIR . '/vendor/autoload.php';

$f3 = Base::instance();

$f3->set('DEBUG', $f3->get('app.debug'));
$f3->set('AUTOLOAD', APP_DIR . '/app/;' . APP_DIR . '/db/');
$f3->set('DB', new SQL('sqlite:' . APP_DIR . '/db/database.sqlite'));

$f3->set('CORS', [
    'origin'      => 'http://localhost:5173',
    'headers'     => 'Content-Type, Authorization',
    'methods'     => 'GET, POST, PUT, DELETE',
    'expose'      => '',
    'credentials' => true,
    'ttl'         => 86400
]);

$f3->config(APP_DIR . '/config/config.ini');

$f3->route('GET /seed [cli]', 'seeders\Seeder->run');
$f3->route('GET /@action [cli]', 'Controllers\ConsoleController->@action');

$f3->run();
