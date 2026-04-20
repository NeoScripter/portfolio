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

    public function create_entry(string $table)
    {
        $cols = implode(
            ', ',
            array_map(
                fn($col) => "`$col`",
                array_keys($this->data)
            )
        );

        $placeholders = implode(
            ', ',
            array_fill(0, count($this->data), '?')
        );

        $values = array_values($this->data);

        Base::instance()->get('DB')->exec(
            "insert into $table ($cols) values ($placeholders)",
            $values
        );
    }

    public function update_entry(string $table, int $id)
    {
        $set = implode(
            ', ',
            array_map(
                fn($col) => "`$col` = ?",
                array_keys($this->data)
            )
        );

        $values = array_values($this->data);
        $values[] = $id;

        Base::instance()->get('DB')->exec(
            "update $table set $set where $table.id = ?",
            $values
        );
    }

    public function add_markdown_field(string $from, string $to)
    {
        if (! isset($this->data[$from]) || ! is_string($this->data[$from])) {
            return;
        }

        $this->data[$to] = to_markdown($this->data[$from]);
    }
}
