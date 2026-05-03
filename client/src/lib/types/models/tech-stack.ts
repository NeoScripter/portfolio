import type { ImageType } from "../shared";

export interface TechStackResource {
    data: TechStackType[];
}

export interface TechStackType {
    id: number;
    attr: {
        html: {
            ru: string;
            en: string;
        };
        body: {
            ru: string;
            en: string;
        };
    },
    image: ImageType;
};
