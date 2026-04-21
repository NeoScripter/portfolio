<?php

declare(strict_types=1);

use DB\SQL;
use DB\SQL\Mapper;

define('APP_DIR', dirname(__DIR__));

require APP_DIR . '/vendor/autoload.php';

$f3 = Base::instance();

$f3->set('DEBUG', $f3->get('app.debug'));
$f3->set('AUTOLOAD', APP_DIR . '/app/;' . APP_DIR . '/db/');
$f3->set('DB', new SQL('sqlite:' . APP_DIR . '/db/database.sqlite'));

$faq_mapper = new Mapper($f3->get('DB'), 'faqs');
$f3->set('FAQS', $faq_mapper);


$f3->set('CORS', [
    'origin'      => 'http://localhost:5173',
    'headers'     => 'Content-Type, Authorization',
    'methods'     => 'GET, POST, PUT, DELETE',
    'expose'      => '',
    'credentials' => true,
    'ttl'         => 86400
]);

$controllers = glob(APP_DIR . '/app/Controllers/*.php');

foreach ($controllers as $controller) {

    $name   = basename($controller, '.php');
    $route  = str_replace('controller', 's', strtolower($name));
    $base   = "Controllers\\$name";
    $prefix = "/$route";

    $routes = [
        "GET    $prefix"      => 'index',
        "POST   $prefix"      => 'store',
        "GET    $prefix/@id"  => 'edit',
        "PUT    $prefix/@id"  => 'update',
        "DELETE $prefix/@id"  => 'destroy',
    ];

    foreach ($routes as $pattern => $action) {
        if (method_exists("Controllers\\$name", $action)) {
            $f3->route($pattern, "$base->$action");
        }
    }
}

$f3->config(APP_DIR . '/config/config.ini');

$f3->route('GET /seed [cli]', 'seeders\Seeder->run');
$f3->route('GET /@action [cli]', 'Controllers\ConsoleController->@action');

$f3->run();
