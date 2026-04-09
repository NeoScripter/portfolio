import { BriefcaseBusiness, House, type LucideIcon, User } from 'lucide-preact';

export type NavLinkType = {
    id: string;
    icon: LucideIcon;
    path: string;
    label: string;
};

export const navLinks: NavLinkType[] = [
    {
        id: crypto.randomUUID(),
        icon: House,
        label: 'Главная',
        path: '/',
    },
    {
        id: crypto.randomUUID(),
        icon: BriefcaseBusiness,
        label: 'Портфолио',
        path: '/portfolio',
    },
    {
        id: crypto.randomUUID(),
        icon: User,
        label: 'Обо мне',
        path: '/about',
    },
];
