<?php

namespace seeders;

use seeders\FaqSeeder;

class Seeder
{
    public function run($f3)
    {
        (new FaqSeeder())->run($f3);
        (new ProjectSeeder())->run($f3);
    }
}
