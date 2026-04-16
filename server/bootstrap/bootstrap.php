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

// $f3->route('OPTIONS /*', function() use ($f3) {
//     // F3 will send CORS headers, just return 200
//     http_response_code(200);
// });

$f3->config(APP_DIR . '/config/setup.ini');

$f3->route('GET /migrate [cli]', 'controllers\Console->migrate');
$f3->route('GET /drop [cli]', 'controllers\Console->drop');
$f3->route('GET /fresh [cli]', 'controllers\Console->fresh');
$f3->route('GET /seed [cli]', 'seeders\Seeder->run');

$f3->run();
