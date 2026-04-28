import type { ImageType } from '../shared';
import type { ModuleType } from './module';

export type ProjectResource = {
    data: ProjectType[];
    links?: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta?: PaginationMeta;
};

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type PaginationMeta = {
    currentPage: number;
    from: number | null;
    lastPage: number;
    links: PaginationLink[];
    path: string;
    perPage: number;
    to: number | null;
    total: number;
};

export type CategoryType = {
    id: number;
    name: {
        ru: string;
        en: string;
    };
};

export type TechnologyType = {
    name: string;
};

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
        priority: number;
        url: string;
        link: string;
    };
    category_id: number;
    image: ImageType;
    modules?: ModuleType[];
};
