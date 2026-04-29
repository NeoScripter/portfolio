<?php

declare(strict_types=1);

namespace Support;

use Base;

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

    public function apply_limit_filter()
    {
        $request = $this->request;

        if (isset($request['limit']) && is_numeric($request['limit'])) {
            $this->options['limit'] = (int)$request['limit'];
        }
    }

    public function apply_exclude_filter()
    {
        $request = $this->request;

        if (isset($request['exclude']) && is_numeric($request['exclude'])) {
            $this->filters[] = 'id NOT IN (?)';
            $this->args[] = (int)$request['exclude'];
        }
    }

    public function apply_search_filter()
    {
        $request = $this->request;

        if (isset($request['search']) && !empty($request['search'])) {
            $term   = '%' . $request['search'] . '%';

            $bindings = array_fill(0, 7, $term);

            $this->filters[] = '(title_ru ILIKE ? OR title_en ILIKE ? OR description_ru ILIKE ? OR description_en ILIKE ? OR tech_stack ILIKE ? OR category_ru ILIKE ? OR category_en ILIKE ?)';
            $this->args = array_merge($this->args, $bindings);
        }
    }

    public function apply_pagination(int $per_page, string $table, string $url_suffix)
    {
        $request = $this->request;

        if (empty($table) || ! array_key_exists('page', $request) || ! is_numeric($request['page'])) {
            return;
        }

        $total = Base::instance()->get($table)->count($this->merge_filters());
        $last_page    = (int) ceil($total / $per_page);
        $current_page = max(1, min($last_page, (int) $request['page']));
        $offset       = max(0, ($current_page - 1) * $per_page);
        $from = $total > 0 ? $offset + 1 : null;
        $to   = $total > 0 ? min($offset + $per_page, $total) : null;
        $base_url     = Base::instance()->get('app_url') . $url_suffix;

        $this->options['limit'] = $per_page;
        $this->options['offset'] = $offset;

        $links = $this->build_pagination_links($base_url, $current_page, $last_page, $request);

        return [
            'total' => $total,
            'from'  => $from,
            'to'    => $to,
            'links' => $links,
            'lastPage' => $last_page,
            'perPage' => $per_page,
            'currentPage' => $current_page,
            'path' => $base_url,
        ];
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
        return [$this->merge_filters(), $this->options];
    }

    private function merge_filters(): array
    {
        if (empty($this->filters)) return [];
        return [implode(' AND ', $this->filters), ...$this->args];
    }

    private function build_pagination_links(string $base_url, int $current, int $last, array $query): array
    {
        $links = [];

        $make_url = function (?int $page) use ($base_url, $query): ?string {
            if ($page === null) return null;
            $params = array_merge($query, ['page' => $page]);
            return $base_url . '?' . http_build_query($params);
        };

        // Previous
        $links[] = [
            'url'    => $current > 1 ? $make_url($current - 1) : null,
            'label'  => 'previous',
            'active' => false,
        ];

        // Numbered pages
        for ($i = 1; $i <= $last; $i++) {
            $links[] = [
                'url'    => $make_url($i),
                'label'  => (string) $i,
                'active' => $i === $current,
            ];
        }

        // Next
        $links[] = [
            'url'    => $current < $last ? $make_url($current + 1) : null,
            'label'  => 'next',
            'active' => false,
        ];

        return $links;
    }
}
