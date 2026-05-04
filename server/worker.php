<?php

use DB\SQL;

require __DIR__ . '/vendor/autoload.php';

$f3 = Base::instance();

define('APP_DIR', __DIR__);

$f3->config(__DIR__ . '/config/config.ini');

$f3->set('AUTOLOAD', __DIR__ . '/app/;');

$f3->set('DB', new SQL(
    "pgsql:host={$f3->get('db_host')};port={$f3->get('db_port')};dbname={$f3->get('db_name')}",
    "{$f3->get('db_user')}",
    "{$f3->get('db_password')}"
));


$pdo = $f3->get('DB')->pdo();

$queue = new n0nag0n\Job_Queue('pgsql');
$queue->addQueueConnection($pdo);
$queue->watchPipeline('send_email');
$queue->watchPipeline('process_image');

while (true) {
    $job = $queue->getNextJobAndReserve();

    if (empty($job)) {
        usleep(500000);
        continue;
    }

    echo "Processing {$job['id']}\n";
    $payload = json_decode($job['payload'], true);

    try {
        // handle the job
        match ($payload['pipeline'] ?? 'process_image') {
            'send_email' => (new \Jobs\SendEmailJob())->handle($payload),
            'process_image' => (new \Jobs\ProcessImageJob())->handle($payload),
            default      => throw new \Exception("Unknown pipeline: {$payload['pipeline']}"),
        };

        $queue->deleteJob($job);
    } catch (\Exception $e) {
        $logger = new \Log('./storage/logs/worker.log');
        $logger->write($e->getMessage());
        $queue->buryJob($job);
    }
}
