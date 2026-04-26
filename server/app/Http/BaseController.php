<?php

namespace Http;

use RuntimeException;

abstract class BaseController
{
    private ?object $request  = null;

    protected function to_resource($data): array
    {
        $class = $this->resolve_companion('Resources', 'Resource');

        if (! $class) {
            throw new \RuntimeException('Resource class was not found');
        }

        return $class::to_resource($data);
    }

    // protected function request(): ?object
    // {
    //     if ($this->request) return $this->request;

    //     $class = $this->resolve_companion('Requests', 'Request');

    //     return $this->request = $class ? new $class : null;
    // }

    private function resolve_companion(string $folder, string $suffix): ?string
    {
        $base = str_replace(
            ['Http\\Controllers\\', 'Controller'],
            '',
            static::class
        );

        $class = "Http\\{$folder}\\{$base}{$suffix}";

        return class_exists($class) ? $class : null;
    }
}
