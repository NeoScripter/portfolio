import type { ImageType } from "../shared";

export interface VideoResource {
    data: VideoType[];
}

export interface VideoType {
    id: number;
    attr: {
        url: string;
        title: {
            ru: string;
            en: string;
        };
    };
    image: ImageType;
}
