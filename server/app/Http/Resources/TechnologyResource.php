<?php

namespace Http\Resources;

class TechnologyResource
{
    public static function to_resource($technology)
    {
        return [
            'id' => $technology['id'],
            'name' => $technology['name']
        ];
    }
}
