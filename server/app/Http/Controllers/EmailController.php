<?php

namespace Http\Controllers;

use Support\Validator;

class EmailController
{
    public function store($f3)
    {
        $validator = Validator::make(get_json(), [
            'email'    => ['required', 'email', 'min:3', 'max:255'],
            'name'     => ['required', 'string', 'min:3', 'max:2255'],
            'message'  => ['required', 'string', 'min:3', 'max:1255'],
            'telegram' => ['nullable', 'max:255'],
            'whatsapp' => ['nullable', 'max:255'],
        ]);

        if ($validator->fails()) {
            send_json(['errors' => $validator->errors(), 'message' => 'Invalid form'], 422);
        }

        $data = $validator->validated();

        try {
            $queue = $f3->get('JOB_QUEUE');
            $queue->selectPipeline('send_email');

            $queue->addJob(json_encode([
                'name'      => $data['name'],
                'email'     => $data['email'],
                'message'   => $data['message'],
                'telegram'  => $data['telegram'] ?? null,
                'whatsapp'  => $data['whatsapp'] ?? null,
                'pipeline'  => 'send_email',
            ]));

            send_json(['message' => 'Email successfully sent!']);
        } catch (\Exception $e) {
            $logger = new \Log('../storage/logs/smtp.log');
            $logger->write('Queue dispatch error: ' . $e->getMessage());
            send_json(['message' => 'Failed to queue email.'], 500);
        }
    }
}
