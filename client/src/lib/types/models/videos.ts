import type { ImageType } from "../shared";

export interface VideoResource {
    data: VideoType[];
}

export interface VideoType {
    id: number;
    attributes: {
        url: string;
        title: {
            ru: string;
            en: string;
        };
    };
    image: ImageType;
}
