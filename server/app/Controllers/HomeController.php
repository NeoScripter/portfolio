<?php

namespace Controllers;

class HomeController
{
    function index($f3)
    {
        echo $f3->get('app.url') . 'Hello, world!';
    }
}
