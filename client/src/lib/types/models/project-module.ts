export type LocalizedText = {
    ru: string;
    en: string;
};

export type ImageFormats = {
    dkAvif: string;
    dkWebp: string;
    tbAvif: string;
    tbWebp: string;
    mbAvif: string;
    mbWebp: string;
    tiny: string;
    alt: LocalizedText;
};

export type ProjectModuleAttributes = {
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

export type ProjectModuleType = {
    id: number;
    attr: ProjectModuleAttributes;
    firstImage?: ImageFormats;
    secondImage?: ImageFormats;
};
