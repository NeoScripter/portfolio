<?php

require __DIR__ . '/vendor/autoload.php';

$f3 = Base::instance();

$f3->config(__DIR__ . '/config/config.ini');

$f3->set('AUTOLOAD', __DIR__ . '/app/;');

$pdo = new PDO(
    "pgsql:host={$f3->get('db_host')};port={$f3->get('db_port')};dbname={$f3->get('db_name')}",
    "{$f3->get('db_user')}",
    "{$f3->get('db_password')}"
);

$queue = new n0nag0n\Job_Queue('pgsql');
$queue->addQueueConnection($pdo);
$queue->watchPipeline('send_email');

while (true) {
    $job = $queue->getNextJobAndReserve();

    if (empty($job)) {
        usleep(500000);
        continue;
    }

    $payload = json_decode($job['payload'], true);

    try {
        // handle the job
        match ($job['pipeline'] ?? 'send_email') {
            'send_email' => (new \Jobs\SendEmailJob())->handle($payload),
            default      => throw new \Exception("Unknown pipeline: {$job['pipeline']}"),
        };

        $queue->deleteJob($job);
    } catch (\Exception $e) {
        error_log($e->getMessage());
        $queue->buryJob($job);
    }
}
