import type { ImageSrcSet, ImageType } from '../shared';

export interface ReviewResource {
    data: ReviewType[];
}

export interface ReviewType {
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
