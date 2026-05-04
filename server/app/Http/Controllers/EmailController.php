<?php

namespace Http\Controllers;

use Support\Validator;

class EmailController
{
    public function store($f3)
    {
        $validator = Validator::make(get_json(), [
            'email' => ['required', 'email', 'min:3', 'max:255'],
            'name' => ['required', 'string', 'min:3', 'max:2255'],
            'message' => ['required', 'string', 'min:3', 'max:1255'],
            'telegram' => ['nullable', 'max:255'],
            'whatsapp' => ['nullable', 'max:255'],
        ]);

        if ($validator->fails()) {
            send_json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        try {
            $this->sendEmail($f3, $data);
            send_json(['message' => 'Email successfully sent!']);
        } catch (\Exception $e) {
            $logger = new \Log('email_errors.log');
            $logger->write('Email error: ' . $e->getMessage());
        }
    }

    protected function sendEmail($f3, $data)
    {
        $smtp = new \SMTP(
            $f3->get('SMTP.host'),
            $f3->get('SMTP.port'),
            $f3->get('SMTP.scheme'),
            $f3->get('SMTP.user'),
            $f3->get('SMTP.pw')
        );

        $smtp->set('From', '"Portfolio" <ask@ilyaandreev.dev>');

        $smtp->set('Reply-To', '"' . $data['name'] . '" <' . $data['email'] . '>');

        $smtp->set('To', '"Your Name" <ask@ilyaandreev.dev>');
        $smtp->set('Subject', 'Емаил с портфолио от ' . $data['name']);

        $message = $this->buildEmailBody($data);

        $result = $smtp->send($message, true);

        if (!$result) {
            $log = $smtp->log();
            $logger = new \Log('smtp_debug.log');
            $logger->write($log);
        }

        return $result;
    }

    protected function buildEmailBody($data)
    {
        $message = "New Contact Form Submission\n\n";
        $message .= "Name: " . $data['name'] . "\n";
        $message .= "Email: " . $data['email'] . "\n";

        if (!empty($data['telegram'])) {
            $message .= "Telegram: " . $data['telegram'] . "\n";
        }

        if (!empty($data['whatsapp'])) {
            $message .= "WhatsApp: " . $data['whatsapp'] . "\n";
        }

        $message .= "\nMessage:\n" . $data['message'] . "\n";

        return $message;
    }
}
