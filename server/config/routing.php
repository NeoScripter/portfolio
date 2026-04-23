<?php

// $f3->set('BASE', '/api');

$f3->route('GET /seed [cli]', 'seeders\Seeder->run');
$f3->route('GET /@action [cli]', 'Http\Controllers\ConsoleController->@action');

$taken = [];

array_walk_recursive(
    $f3->get('ROUTES'),
    function ($val) use (&$taken) {
        if (is_string($val)) {
            $taken[] = $val;
        }
    }
);

$controllers = glob(APP_DIR . '/app/Http/Controllers/*.php');

foreach ($controllers as $controller) {

    $name   = basename($controller, '.php');
    $route  = str_replace('Controller', 's', $name);
    $route = strtolower(preg_replace('/(?<!^)[A-Z]/', '-$0', $route));
    $base   = "Http\\Controllers\\$name";
    $prefix = "/api/$route";

    $routes = [
        "GET    $prefix"      => 'index',
        "POST   $prefix"      => 'store',
        "GET    $prefix/@id"  => 'edit',
        "PUT    $prefix/@id"  => 'update',
        "DELETE $prefix/@id"  => 'destroy',
    ];

    foreach ($routes as $pattern => $action) {
        $path = "Http\\Controllers\\$name";
        if (in_array($path . "->$action", $taken) || ! method_exists($path, $action)) {
            continue;
        }
        $f3->route($pattern, "$base->$action");
    }
}
