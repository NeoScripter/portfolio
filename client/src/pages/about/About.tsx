import AppTitle from "@/components/layout/AppTitle";
import AppLayout from "@/layouts/AppLayout";
import Hero from "./partials/Hero";
import Journey from "./partials/Journey";
import Stages from "./partials/Stages";
import Services from "./partials/Services";
import SeeAlso from "@/components/shared/SeeAlso";
import FeaturedQuote from "./partials/FeaturedQuote";
import Intro from "./partials/Intro";

export default function About() {
    return (
        <AppLayout>
            <AppTitle titleEn="About" titleRu="Обо мне" />
            <Hero />
            <Intro />
            <Journey />
            <Stages />
            <Services />
            <SeeAlso title="Мои проекты" />
            <FeaturedQuote />
        </AppLayout>
    );
}

