import type { ImageType } from '../shared';

export type LocalizedText = {
    ru: string;
    en: string;
};

export type ModuleAttributes = {
    heading: LocalizedText;
    html: LocalizedText;
    body?: LocalizedText;
    order: number;
    type:
        | 'only_text'
        | 'two_image_block'
        | 'two_image_split'
        | 'one_image_split';
};

export type ModuleType = {
    id: number;
    attr: ModuleAttributes;
    firstImage?: ImageType;
    secondImage?: ImageType;
};

export type ModuleOptionType =
    | 'only_text'
    | 'two_image_split'
    | 'two_image_block'
    | 'one_image_split';
