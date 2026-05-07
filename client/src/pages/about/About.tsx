import AppTitle from '@/components/layout/AppTitle';
import SeeAlso from '@/components/shared/SeeAlso';
import AppLayout from '@/layouts/AppLayout';
import { locale } from '@/signals/locale';
import FeaturedQuote from './partials/FeaturedQuote';
import Hero from './partials/Hero';
import Intro from './partials/Intro';
import Journey from './partials/Journey';
import Services from './partials/Services';
import Stages from './partials/Stages';

export default function About() {
    return (
        <AppLayout>
            <AppTitle titleEn="About" titleRu="Обо мне" />
            <Hero />
            <Intro />
            <Journey />
            <Stages />
            <Services />
            <SeeAlso
                title={locale.value === 'ru' ? 'Мои проекты' : 'My projects'}
            />
            <FeaturedQuote />
        </AppLayout>
    );
}
