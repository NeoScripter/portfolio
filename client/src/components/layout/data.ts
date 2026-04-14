import { BriefcaseBusiness, House, type LucideIcon, User, TableOfContents, MessageSquareCode, LayoutGrid, Video, Keyboard } from 'lucide-preact';

export type NavLinkType = {
    id: string;
    icon: LucideIcon;
    path: string;
    label: {
        ru: string;
        en: string;
    };
};

export const navLinks: NavLinkType[] = [
    {
        id: crypto.randomUUID(),
        icon: House,
        label: {
            ru: 'Главная',
            en: 'Home',
        },
        path: '/',
    },
    {
        id: crypto.randomUUID(),
        icon: BriefcaseBusiness,
        label: {
            ru: 'Проекты',
            en: 'Projects',
        },
        path: '/gallery',
    },
    {
        id: crypto.randomUUID(),
        icon: User,
        label: {
            ru: 'Обо мне',
            en: 'About',
        },
        path: '/about',
    },
];

export type SidebarLinkType = {
    id: string;
    icon: LucideIcon;
    path: string;
    label: {
        ru: string;
        en: string;
    };
};

export const sidebarLinks: SidebarLinkType[] = [
    {
        id: crypto.randomUUID(),
        icon: LayoutGrid,
        label: {
            ru: 'Панель управления',
            en: 'Dashboard',
        },
        path: '/admin',
    },
    {
        id: crypto.randomUUID(),
        icon: TableOfContents,
        label: {
            ru: 'FAQs',
            en: 'FAQs',
        },
        path: '/admin/faqs',
    },
    {
        id: crypto.randomUUID(),
        icon: MessageSquareCode,
        label: {
            ru: 'Отзывы',
            en: 'Reviews',
        },
        path: '/admin/reviews',
    },
    {
        id: crypto.randomUUID(),
        icon: Video,
        label: {
            ru: 'Видео',
            en: 'Videos',
        },
        path: '/admin/videos',
    },
    {
        id: crypto.randomUUID(),
        icon: Keyboard,
        label: {
            ru: 'Навыки',
            en: 'Tech Stack',
        },
        path: '/admin/stacks',
    },
    {
        id: crypto.randomUUID(),
        icon: BriefcaseBusiness,
        label: {
            ru: 'Проекты',
            en: 'Projects',
        },
        path: '/admin/projects',
    },
];
