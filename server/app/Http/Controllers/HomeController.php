<?php

namespace Http\Controllers;

class HomeController
{
    function index($f3)
    {
        // echo pp($f3->get('ROUTES'));
        // print_r($f3->get('ROUTES'));
        $depth = 0;
        $res = '';

        array_walk_recursive(
            $f3->get('ROUTES'),
            function ($val) use (&$depth, &$res) {

                if (is_string($val)) {
                    $res .= (str_repeat(' ', $depth) . $val . "\n");
                } else {
                    $depth++;
                }
            }
        );

        echo '<pre>';
        echo $res;
        echo '</pre>';
        // foreach($f3->get('ROUTES') as $route) {

        // }
        // echo implode(',', $f3->get('ALIASES')) . 'Hello, world!';
    }
}
