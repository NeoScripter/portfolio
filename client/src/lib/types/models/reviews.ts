import type { ImageSrcSet, ImageType } from '../shared';

export type ReviewResource = {
    data: ReviewType[];
}

export type ReviewType = {
    id: number;
    attr: {
        author: {
            ru: string;
            en: string;
        };
        description: {
            ru: string;
            en: string;
        };
    };
    image: ImageType;
}

