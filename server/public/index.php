<?php

declare(strict_types=1);

error_reporting(E_ALL & ~E_DEPRECATED & ~E_USER_DEPRECATED);

define('APP_DIR', dirname(__DIR__));

require APP_DIR . '/config/bootstrap.php';
