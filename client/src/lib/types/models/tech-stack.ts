import type { ImageType } from "../shared";

export type TechStackResource = {
    data: TechStackType[];
}

export type TechStackType = {
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
