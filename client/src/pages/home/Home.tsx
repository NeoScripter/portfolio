import AppTitle from "@/components/layout/AppTitle";
import AppLayout from "@/layouts/AppLayout";
import Hero from "./partials/Hero";
import Intro from "./partials/Intro";
import Featured from "./partials/Featured";
import Services from "./partials/Services";
import Faqs from "./partials/Faqs";

const Home = () => {
        return <AppLayout>
            <AppTitle titleEn="Home" titleRu="Главная" />
            <Hero />
            <Intro />
            <Featured />
            <Services />
            {/* <VideosSection /> */}
            {/* <PerksSection /> */}
            <Faqs />
        </AppLayout>
};

export default Home;
