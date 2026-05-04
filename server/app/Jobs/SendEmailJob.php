<?php

namespace Jobs;

class SendEmailJob
{
    public function handle(array $payload): void
    {
        $f3 = \Base::instance();

        $smtp = new \SMTP(
            $f3->get('SMTP.host'),
            $f3->get('SMTP.port'),
            $f3->get('SMTP.scheme'),
            $f3->get('SMTP.user'),
            $f3->get('SMTP.pw')
        );

        $smtp->set('From',     '"Portfolio" <ask@ilyaandreev.dev>');
        $smtp->set('Reply-To', '"' . $payload['name'] . '" <' . $payload['email'] . '>');
        $smtp->set('To',       '"Your Name" <ask@ilyaandreev.dev>');
        $smtp->set('Subject',  'Емаил с портфолио от ' . $payload['name']);

        $message = $this->buildEmailBody($payload);

        $result = $smtp->send($message, true);

        if (!$result) {
            $logger = new \Log('../storage/logs/smtp.log');
            $logger->write($smtp->log());
            throw new \Exception('SMTP send failed. See smtp.log for details.');
        }
    }

    protected function buildEmailBody(array $data): string
    {
        $message  = "New Contact Form Submission\n\n";
        $message .= "Name: "    . $data['name']    . "\n";
        $message .= "Email: "   . $data['email']   . "\n";

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
