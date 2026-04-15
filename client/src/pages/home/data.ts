
import HeroDkTinyWebp from '@/assets/imgs/home/hero/hero-dk-tiny.webp';
import HeroDkAvif from '@/assets/imgs/home/hero/hero-dk.avif';
import HeroDkWebp from '@/assets/imgs/home/hero/hero-dk.webp';
import HeroDk2xAvif from '@/assets/imgs/home/hero/hero-dk2x.avif';
import HeroDk2xWebp from '@/assets/imgs/home/hero/hero-dk2x.webp';
import HeroDk3xAvif from '@/assets/imgs/home/hero/hero-dk3x.avif';
import HeroDk3xWebp from '@/assets/imgs/home/hero/hero-dk3x.webp';
import HeroMbTinyWebp from '@/assets/imgs/home/hero/hero-mb-tiny.webp';
import HeroMbAvif from '@/assets/imgs/home/hero/hero-mb.avif';
import HeroMbWebp from '@/assets/imgs/home/hero/hero-mb.webp';
import HeroMb2xAvif from '@/assets/imgs/home/hero/hero-mb2x.avif';
import HeroMb2xWebp from '@/assets/imgs/home/hero/hero-mb2x.webp';
import HeroMb3xAvif from '@/assets/imgs/home/hero/hero-mb3x.avif';
import HeroMb3xWebp from '@/assets/imgs/home/hero/hero-mb3x.webp';
import HeroTbTinyWebp from '@/assets/imgs/home/hero/hero-tb-tiny.webp';
import HeroTbAvif from '@/assets/imgs/home/hero/hero-tb.avif';
import HeroTbWebp from '@/assets/imgs/home/hero/hero-tb.webp';
import HeroTb2xAvif from '@/assets/imgs/home/hero/hero-tb2x.avif';
import HeroTb2xWebp from '@/assets/imgs/home/hero/hero-tb2x.webp';
import HeroTb3xAvif from '@/assets/imgs/home/hero/hero-tb3x.avif';
import HeroTb3xWebp from '@/assets/imgs/home/hero/hero-tb3x.webp';

import BgDkTinyWebp from "@/assets/imgs/home/featured/bg-dk-tiny.webp";
import BgDkAvif from "@/assets/imgs/home/featured/bg-dk.avif";
import BgDkWebp from "@/assets/imgs/home/featured/bg-dk.webp";
import BgDk2xAvif from "@/assets/imgs/home/featured/bg-dk2x.avif";
import BgDk2xWebp from "@/assets/imgs/home/featured/bg-dk2x.webp";
import BgDk3xAvif from "@/assets/imgs/home/featured/bg-dk3x.avif";
import BgDk3xWebp from "@/assets/imgs/home/featured/bg-dk3x.webp";
import BgMbTinyWebp from "@/assets/imgs/home/featured/bg-mb-tiny.webp";
import BgMbAvif from "@/assets/imgs/home/featured/bg-mb.avif";
import BgMbWebp from "@/assets/imgs/home/featured/bg-mb.webp";
import BgMb2xAvif from "@/assets/imgs/home/featured/bg-mb2x.avif";
import BgMb2xWebp from "@/assets/imgs/home/featured/bg-mb2x.webp";
import BgMb3xAvif from "@/assets/imgs/home/featured/bg-mb3x.avif";
import BgMb3xWebp from "@/assets/imgs/home/featured/bg-mb3x.webp";
import BgTbTinyWebp from "@/assets/imgs/home/featured/bg-tb-tiny.webp";
import BgTbAvif from "@/assets/imgs/home/featured/bg-tb.avif";
import BgTbWebp from "@/assets/imgs/home/featured/bg-tb.webp";
import BgTb2xAvif from "@/assets/imgs/home/featured/bg-tb2x.avif";
import BgTb2xWebp from "@/assets/imgs/home/featured/bg-tb2x.webp";
import BgTb3xAvif from "@/assets/imgs/home/featured/bg-tb3x.avif";
import BgTb3xWebp from "@/assets/imgs/home/featured/bg-tb3x.webp";

import type { ImageSrcSet } from '@/lib/types/shared';

export const heroSrcSet: ImageSrcSet = {
    dk: HeroDkWebp,
    dkAvif: HeroDkAvif,
    dk2x: HeroDk2xWebp,
    dkAvif2x: HeroDk2xAvif,
    dk3x: HeroDk3xWebp,
    dkAvif3x: HeroDk3xAvif,
    dkTiny: HeroDkTinyWebp,
    tb: HeroTbWebp,
    tbAvif: HeroTbAvif,
    tb2x: HeroTb2xWebp,
    tbAvif2x: HeroTb2xAvif,
    tb3x: HeroTb3xWebp,
    tbAvif3x: HeroTb3xAvif,
    tbTiny: HeroTbTinyWebp,
    mb: HeroMbWebp,
    mbAvif: HeroMbAvif,
    mb2x: HeroMb2xWebp,
    mbAvif2x: HeroMb2xAvif,
    mb3x: HeroMb3xWebp,
    mbAvif3x: HeroMb3xAvif,
    mbTiny: HeroMbTinyWebp,
};

export const featuredBgSrcSet: ImageSrcSet = {
    dk: BgDkWebp,
    dkAvif: BgDkAvif,
    dk2x: BgDk2xWebp,
    dkAvif2x: BgDk2xAvif,
    dk3x: BgDk3xWebp,
    dkAvif3x: BgDk3xAvif,
    dkTiny: BgDkTinyWebp,
    tb: BgTbWebp,
    tbAvif: BgTbAvif,
    tb2x: BgTb2xWebp,
    tbAvif2x: BgTb2xAvif,
    tb3x: BgTb3xWebp,
    tbAvif3x: BgTb3xAvif,
    tbTiny: BgTbTinyWebp,
    mb: BgMbWebp,
    mbAvif: BgMbAvif,
    mb2x: BgMb2xWebp,
    mbAvif2x: BgMb2xAvif,
    mb3x: BgMb3xWebp,
    mbAvif3x: BgMb3xAvif,
    mbTiny: BgMbTinyWebp,
};


import type { LucideIcon } from 'lucide-preact';
import {
    Code,
    Palette,
    Presentation,
    Search,
    Shield,
    Smartphone,
    Users,
    Zap,
} from 'lucide-preact';

export type ServiceType = {
    id: string;
    icon: LucideIcon;
    title: {
        ru: string;
        en: string;
    };
    description: {
        ru: string;
        en: string;
    };
}

export const services: ServiceType[] = [
    {
        id: crypto.randomUUID(),
        icon: Presentation,
        title: {
            ru: 'Лендинг',
            en: 'Landing Page',
        },
        description: {
            ru: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
            en: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Code,
        title: {
            ru: 'Веб-разработка',
            en: 'Web Development',
        },
        description: {
            ru: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
            en: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Palette,
        title: {
            ru: 'UI/UX Дизайн',
            en: 'UI/UX Design',
        },
        description: {
            ru: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
            en: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Smartphone,
        title: {
            ru: 'Мобильные приложения',
            en: 'Mobile Applications',
        },
        description: {
            ru: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
            en: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Search,
        title: {
            ru: 'SEO Оптимизация',
            en: 'SEO Optimization',
        },
        description: {
            ru: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
            en: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Zap,
        title: {
            ru: 'Технический аудит',
            en: 'Technical Audit',
        },
        description: {
            ru: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
            en: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Shield,
        title: {
            ru: 'Кибербезопасность',
            en: 'Cybersecurity',
        },
        description: {
            ru: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
            en: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Users,
        title: {
            ru: 'Техническая поддержка',
            en: 'Technical Support',
        },
        description: {
            ru: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
            en: 'Lorem ipsum dolor sit amet consectetur. Morbi diam nisi nam diam interdum',
        },
    },
];

export interface UpsideType {
    id: string;
    icon: LucideIcon;
    description: {
        ru: string;
        en: string;
    };
}

export const upsides: UpsideType[] = [
    {
        id: crypto.randomUUID(),
        icon: Presentation,
        description: {
            ru: 'Профессиональные презентации, которые впечатляют клиентов и эффективно доносят ваши идеи',
            en: 'Professional presentations that impress clients and effectively communicate your ideas',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Code,
        description: {
            ru: 'Чистый и поддерживаемый код с использованием современных технологий и лучших практик разработки',
            en: 'Clean, maintainable code using modern technologies and development best practices',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Palette,
        description: {
            ru: 'Эстетичный дизайн, ориентированный на пользовательский опыт и визуальную привлекательность',
            en: 'Aesthetic design focused on user experience and visual appeal',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Smartphone,
        description: {
            ru: 'Полная адаптивность для всех устройств — от смартфонов до десктопных компьютеров',
            en: 'Fully responsive across all devices',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Search,
        description: {
            ru: 'Оптимизация для поисковых систем, помогающая вашему сайту занимать высокие позиции в результатах поиска и привлекать целевую аудиторию',
            en: 'Search engine optimization to help your site rank higher and attract targeted traffic',
        },
    },
    {
        id: crypto.randomUUID(),
        icon: Zap,
        description: {
            ru: 'Молниеносная производительность',
            en: 'Lightning-fast performance with optimized loading times and smooth interactions',
        },
    },
];



