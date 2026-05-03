import type { ImageType } from "../shared";

export type VideoResource = {
    data: VideoType[];
}

export type VideoType = {
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
