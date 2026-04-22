<?php

declare(strict_types=1);

namespace Support;

use Base;

class DBHandler
{
    protected function __construct(
        private array &$data,
    ) {}

    public static function make(array &$data)
    {
        return new self($data);
    }

}
