<?php

namespace Http\Controllers;

use Support\JwtHandler;
use Support\Validator;

class SessionController
{
    public function store($f3)
    {
        $validator = Validator::make(get_json(), [
            'email' => ['required', 'exists:users,email'],
            'password' => ['required', 'string', 'min:8', 'max:300'],
        ]);

        if ($validator->fails()) {
            send_json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        $user = $f3->get('_USERS');
        $user->load(['email=?', $data['email']]);

        if ($user->dry() || !password_verify($data['password'], $user->password)) {
            send_json(['errors' => ['email' => 'Invalid credentials']], 401);
        }

        $jwt     = JwtHandler::make()->create_jwt_for_user($user->id);
        $ttl     = $f3->get('jwt_ttl');
        $is_prod = $f3->get('app_env') === 'production';

        setcookie('token', $jwt['token'], [
            'expires'  => time() + $ttl,
            'path'     => '/',
            'httponly' => true,
            'secure'   => $is_prod,
            'samesite' => $is_prod ? 'Strict' : 'Lax',
        ]);

        send_json(['message' => "Welcome, $user->name", 'user' => $user->cast()]);
    }

    public function show($f3)
    {
        $payload = JwtHandler::make()->require_auth();

        $user = $f3->get('_USERS');
        $user->load(['id=?', $payload['sub']]);

        if ($user->dry()) {
            send_json(['message' => 'User not found'], 404);
        }

        send_json(['user' => $user->cast()]);
    }

    public function destroy($f3)
    {
        $is_prod = $f3->get('app_env') === 'production';

        setcookie('token', '', [
            'expires'  => time() - 3600,
            'path'     => '/',
            'httponly' => true,
            'secure'   => $is_prod,
            'samesite' => $is_prod ? 'Strict' : 'Lax',
        ]);

        send_json(['message' => 'See you later!']);
    }
}
