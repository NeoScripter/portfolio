import AppTitle from '@/components/layout/AppTitle';
import AppLayout from '@/layouts/AppLayout';
import Faqs from './partials/Faqs';
import Featured from './partials/Featured';
import Hero from './partials/Hero';
import Intro from './partials/Intro';
import Services from './partials/Services';
import Upsides from './partials/Upsides';

const Home = () => {
    return (
        <AppLayout>
            <AppTitle titleEn="Home" titleRu="Главная" />
            <Hero />
            <Intro />
            <Featured />
            <Services />
            {/* <VideosSection /> */}
            <Upsides />
            <Faqs />
        </AppLayout>
    );
};

export default Home;
