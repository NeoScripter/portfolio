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
        if (empty($this->data)) {
            return;
        }

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

        $db = Base::instance()->get('DB');

        $db->exec(
            "insert into $table ($cols) values ($placeholders)",
            $values
        );

        return (int) $db->pdo()->lastInsertId();
    }

    public function update_entry(string $table, int $id)
    {
        if (empty($this->data)) {
            return;
        }

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

    public static function delete_entry(string $table, int $id)
    {
        $db = Base::instance()->get('DB');

        $affected = $db->exec(
            "DELETE FROM $table WHERE id = ?",
            [$id]
        );

        return $affected;
    }

    public function add_markdown_field(string $from, string $to)
    {
        if (! isset($this->data[$from]) || ! is_string($this->data[$from])) {
            return;
        }

        $this->data[$to] = to_markdown($this->data[$from]);
    }

    public function update_image_entry(int $imageable_id, string $imageable_type)
    {
        if (empty($this->data)) {
            return;
        }

        $set = implode(
            ', ',
            array_map(
                fn($col) => "`$col` = ?",
                array_keys($this->data)
            )
        );

        $values = array_values($this->data);
        $values = array_merge($values, [$imageable_id, $imageable_type]);

        Base::instance()->get('DB')->exec(
            "update images set $set where imageable_id = ? and imageable_type = ?",
            $values
        );
    }

    public static function delete_image_entry(string $table, int $id, array $variants)
    {
        $db = Base::instance()->get('DB');

        ImageHandler::purge_files(
            'images',
            array_map(
                fn($var) => $var[0],
                $variants
            ),
            $id,
            $table
        );

        $affected = $db->exec(
            'DELETE FROM images WHERE imageable_id = ? AND imageable_type = ?',
            [$id, $table]
        );

        return $affected;
    }
}
