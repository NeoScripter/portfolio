<?php

use Support\JwtHandler;

$f3->route('GET /api/seed [cli]', 'seeders\Seeder->run');
$f3->route('GET /api/@action [cli]', 'Http\Controllers\ConsoleController->@action');

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

$auth = function () {
    JwtHandler::make()->require_auth();
};

$mw = \Middleware::instance();

foreach ($controllers as $controller) {

    $name   = basename($controller, '.php');
    $route  = str_replace('Controller', '', $name);
    $route = convert_to_kebab_case($route);
    $route = convert_to_plural($route);
    $base   = "Http\\Controllers\\$name";
    $prefix = "/api/$route";

    $routes = [
        "GET    $prefix"      => 'index',
        "POST   $prefix"      => 'store',
        "GET    $prefix/@id"  => 'edit',
        "PUT    $prefix/@id"  => 'update',
        "DELETE $prefix/@id"  => 'destroy',
    ];

    $path = "Http\\Controllers\\$name";

    foreach ($routes as $pattern => $action) {
        if (in_array($path . "->$action", $taken) || ! method_exists($path, $action)) {
            continue;
        }

        // Automatically assign middleware to crud routes
        [$method, $url] = preg_split('/\s+/', $pattern);

        if ($method !== 'GET') {
            $mw->before("$method $url", $auth);
        }

        // Automatically assign crud routes
        $f3->route($pattern, "$base->$action");
    }
}

$mw->run();
