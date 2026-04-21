<?php

namespace Controllers;

class HomeController
{
    function index($f3)
    {
        echo implode(',' ,$f3->get('ALIASES')) . 'Hello, world!';
    }
}
