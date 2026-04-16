<?php

namespace controllers;

class Faq {

    public function index($f3) {
        $faqs = $f3->get('DB')->exec('select * from faqs'); 

        return json($faqs);
    }
}
