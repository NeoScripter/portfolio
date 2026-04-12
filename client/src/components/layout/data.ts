import { BriefcaseBusiness, House, type LucideIcon, User } from 'lucide-preact';

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
