<?php

namespace Http\Controllers;

class HomeController
{
    function index($f3)
    {
        // echo pp($f3->get('ROUTES'));
        // print_r($f3->get('ROUTES'));

        echo '<pre>';
        print_r(image_variants([['mb', 200], ['dk', 3000]]));
        echo '</pre>';
        // foreach($f3->get('ROUTES') as $route) {

        // }
        // echo implode(',', $f3->get('ALIASES')) . 'Hello, world!';
    }
}

