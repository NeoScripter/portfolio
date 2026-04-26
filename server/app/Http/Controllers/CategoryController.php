<?php

namespace Http\Controllers;

use Http\BaseController;
use Support\Validator;

class CategoryController extends BaseController
{
    public function index($f3)
    {
        $categories = $f3->get('_CATEGORIES')->find();

        $categories = array_map(
            fn($category) => $this->to_resource($category),
            $categories
        );

        $data = [
            'data' => $categories
        ];

        send_json($data);
    }

    public function store($f3)
    {
        $validator = Validator::make(array_merge($f3->get('POST'), $_FILES), [
            'name_en' => ['required', 'string', 'max:200', 'unique:categories,name_en'],
            'name_ru' => ['required', 'string', 'max:200', 'unique:categories,name_ru'],
        ]);

        if ($validator->fails()) {
            send_json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        $category = $f3->get('_CATEGORIES');
        $category->copyFrom($data);
        $category->save();

        send_json(['message' => 'Category successfully created!']);
    }

    public function destroy($f3)
    {
        $category = $f3->get('_CATEGORIES');
        $category->load(['id=?', $f3->get('PARAMS.id')]);

        if (! $category) {
            send_json(['message' =>  "Category not found"], 422);
        }

        $category->erase();

        send_json(['message' => 'Category successfully deleted!']);
    }
}
