import AppTitle from "@/components/layout/AppTitle";
import AppLayout from "@/layouts/AppLayout";
import Hero from "./partials/Hero";
import ProjectFeed from "./partials/ProjectFeed";

export default function Gallery() {
    return (
        <AppLayout>
            <AppTitle titleEn="Portfolio" titleRu="Порфолио" />
            <Hero />
            <ProjectFeed />
        </AppLayout>
    );
}
