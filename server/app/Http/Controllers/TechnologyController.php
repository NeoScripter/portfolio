<?php

namespace Http\Controllers;

use Http\BaseController;

class TechnologyController extends BaseController
{
    public function index($f3)
    {
        $technologies = $f3->get('_TECHNOLOGIES')->find();

        $technologies = array_map(
            fn($category) => $this->to_resource($category),
            $technologies
        );

        $data = [
            'data' => $technologies
        ];

        send_json($data);
    }
}
