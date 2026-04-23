import type { ImageType } from "../shared";
import type { ModuleType } from "./module";

export type ProjectResource = {
    data: ProjectType[];
    links?: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta?: {
        current_page: number;
        from: number | null;
        last_page: number;
        links: PaginationLink[];
        path: string;
        per_page: number;
        to: number | null;
        total: number;
    };
}

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
}

export type PaginationMeta<T> = {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export type CategoryType = {
    id: number;
    name: {
        ru: string;
        en: string;
    };
}

export type TechnologyType = {
    name: string;
}

export type ProjectType = {
    id: number;
    attr: {
        title: {
            ru: string;
            en: string;
        };
        description: {
            ru: string;
            en: string;
        };
        category: {
            ru: string;
            en: string;
        };
        stacks: string[];
        mockup: number;
        slug: string;
        display_order: number;
        url: string;
        link: string;
    };
    image: ImageType;
    modules?: ModuleType[];
}
