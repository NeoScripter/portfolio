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

$controllers = glob(APP_DIR . '/app/Controllers/*.php');

foreach ($controllers as $controller) {

    $name = basename($controller, '.php');
    $route = strtolower($name);
    $route = str_replace('controller', 's', $route);

    $f3->route("GET /$route", 'Controllers\\' . $name. '->index');
    $f3->route("POST /$route", 'Controllers\\' . $name. '->store');
    $f3->route("GET /$route/@id", 'Controllers\\' . $name. '->edit');
    $f3->route("PUT /$route/@id", 'Controllers\\' . $name. '->update');
    $f3->route("DELETE /$route/@id", 'Controllers\\' . $name. '->destroy');
}

$f3->run();
