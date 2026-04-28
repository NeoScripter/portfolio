<?php

declare(strict_types=1);

namespace Support;

final class Paginator
{
    private string $error = '';
    private array $filters = [];
    private array $options = [];
    private array $args = [];

    protected function __construct(
        private array $request,
    ) {}

    public static function make(array $request)
    {
        return new self($request);
    }

    public function process()
    {
        $this->handle_limit_param();
        $this->handle_exclude_param();
        $this->handle_search_param();
    }

    private function handle_limit_param()
    {
        $request = $this->request;

        if (isset($request['limit']) && is_numeric($request['limit'])) {
            $this->options['limit'] = (int)$request['limit'];
        }
    }

    private function handle_exclude_param()
    {
        $request = $this->request;

        if (isset($request['exclude']) && is_numeric($request['exclude'])) {
            $this->filters[] = 'id NOT IN (?)';
            $this->args[] = (int)$request['exclude'];
        }
    }

    private function handle_search_param()
    {
        $request = $this->request;

        if (isset($request['search']) && !empty($request['search'])) {
            $term   = '%' . $request['search'] . '%';

            $bindings = array_fill(0, 7, $term);

            $this->filters[] = '(title_ru ILIKE ? OR title_en ILIKE ? OR description_ru ILIKE ? OR description_en ILIKE ? OR tech_stack ILIKE ? OR category_ru ILIKE ? OR category_en ILIKE ?)';
            $this->args = array_merge($this->args, $bindings);
        }
    }

    public function fails()
    {
        return $this->error !== '';
    }

    public function error()
    {
        return $this->error;
    }

    public function output(): array
    {
        $filters = [implode(' AND ', $this->filters), ...$this->args];
        return [$filters, $this->options];
    }
}
