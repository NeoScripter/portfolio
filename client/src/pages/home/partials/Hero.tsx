import AdaptiveImg from '@/components/ui/AdaptiveImg';
import HeroLayout from '@/layouts/HeroLayout';
import { heroSrcSet } from '../data';
import HeroActions from './HeroActions';

const Hero = () => {
    return (
        <HeroLayout className="min-h-210 text-white sm:min-h-291 md:min-h-212">
            <AdaptiveImg
                prtClass="bg-home-hero-bg -z-5"
                srcs={heroSrcSet}
                variant="bg"
            />

            <span
                aria-hidden="true"
                class="absolute inset-0 -z-5 bg-black/40"
            ></span>

            <div class="lg:max-w-2/3 xl:max-w-1/2">
                <h1 class="xs:text-5xl mb-8 text-4xl font-medium text-balance sm:mb-10 sm:text-6xl">
                    Элегантные и быстрые сайты
                </h1>
                <p class="mb-8 sm:mb-10 lg:mb-12">
                    Здравствуйте! Меня зовут Илья и я - веб-разработчик,
                    создающий быстрые и производительные сайты и веб приложения
                    с красивыми и современными интерфейсами.
                </p>

                <HeroActions />
            </div>
        </HeroLayout>
    );
};

export default Hero;
