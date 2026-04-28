<?php

namespace Jobs;

class SendEmailJob
{
    public function handle(array $payload): void
    {
        // your email sending logic here
        // mail($payload['to'], $payload['subject'], $payload['body']);
        echo 'Job works';
        print_r($payload);
    }
}
