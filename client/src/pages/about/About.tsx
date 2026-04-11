import AppTitle from "@/components/layout/AppTitle";
import AppLayout from "@/layouts/AppLayout";
import Hero from "./partials/Hero";
import Journey from "./partials/Journey";

export default function About() {
    return (
        <AppLayout>
            <AppTitle titleEn="About" titleRu="Обо мне" />
            <Hero />
            {/* <IntroSection /> */}
            <Journey />
            {/* <StagesSection /> */}
            {/* <ServicesSection /> */}
            {/* <ProjectsSection title="Мои проекты" /> */}
            {/* <QuoteSection /> */}
        </AppLayout>
    );
}

