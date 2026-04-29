<?php

declare(strict_types=1);

namespace Support;

use Base;

final class JwtHandler
{
    public static function make()
    {
        return new self();
    }

    private function base64url_encode($data)
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private function base64url_decode($data)
    {
        $remainder = strlen($data) % 4;
        if ($remainder) {
            $padlen = 4 - $remainder;
            $data .= str_repeat('=', $padlen);
        }
        return base64_decode(strtr($data, '-_', '+/'));
    }

    private function jwt_encode(array $payload)
    {
        $secret = Base::instance()->jwt_secret;
        $header = ['alg' => 'HS256', 'typ' => 'JWT'];
        $header_encoded = $this->base64url_encode(json_encode($header));
        $payload_encoded = $this->base64url_encode(json_encode($payload));
        $signature = hash_hmac('sha256', "$header_encoded.$payload_encoded", $secret, true);
        $signature_encoded = $this->base64url_encode($signature);
        return "$header_encoded.$payload_encoded.$signature_encoded";
    }

    function jwt_decode($token)
    {
        $secret = Base::instance()->jwt_secret;
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }
        list($header_b64, $payload_b64, $sig_b64) = $parts;
        $header = json_decode($this->base64url_decode($header_b64), true);
        $payload = json_decode($this->base64url_decode($payload_b64), true);
        $sig = $this->base64url_decode($sig_b64);

        if (!$header || !$payload) return null;

        $signed = hash_hmac('sha256', "$header_b64.$payload_b64", $secret, true);
        if (!hash_equals($signed, $sig)) {
            return null;
        }

        if (isset($payload['exp']) && time() > $payload['exp']) {
            return null;
        }

        return $payload;
    }

    public function create_jwt_for_user($user_id)
    {
        $base = Base::instance();
        $now = time();
        $jti = bin2hex(random_bytes(16));
        $payload = [
            'iat' => $now,
            'nbf' => $now,
            'exp' => $now + $base->jwt_ttl,
            'iss' => $base->jwt_iss,
            'aud' => $base->jwt_aud,
            'sub' => $user_id,
            'jti' => $jti
        ];
        return ['token' => $this->jwt_encode($payload), 'payload' => $payload];
    }
}
