<?php

namespace factories;

abstract class Factory
{
    protected $fakerRu;
    protected $fakerEn;

    public function __construct()
    {
        $this->fakerRu = \Faker\Factory::create('ru_RU');
        $this->fakerEn = \Faker\Factory::create('en_US');
    }

    abstract public function make(): array;

    public function makeMany(int $count = 1): array
    {
        $records = [];
        for ($i = 0; $i < $count; $i++) {
            $records[] = $this->make();
        }
        return $records;
    }
}
