import type { ImageType } from "../shared";

export interface ProjectResource {
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

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginationMeta<T> {
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

export interface ProjectCategoryType {
    id: number;
    name: {
        ru: string;
        en: string;
    };
}

export interface ProjectTechnologyType {
    name: string;
}

export interface ProjectType {
    id: number;
    attributes: {
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
        slug: string;
        order: number;
        url: string;
        link: string;
    };
    image: ImageType;
    links: {
        self: string;
    }[];
    modules?: unknown[];
}
