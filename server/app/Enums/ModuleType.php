<?php

namespace Enums;

enum ModuleType: string
{
    case ONLY_TEXT = 'only_text';
    case TWO_IMAGE_BLOCK = 'two_image_block';
    case ONE_IMAGE_SPLIT = 'one_image_split';
    case TWO_IMAGE_SPLIT = 'two_image_split';
}
