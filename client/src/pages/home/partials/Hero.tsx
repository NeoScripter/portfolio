import AdaptiveImg from '@/components/ui/AdaptiveImg';
import HeroLayout from '@/layouts/HeroLayout';
import { locale } from '@/signals/locale';
import { heroSrcSet } from '../data';
import HeroActions from './HeroActions';

const Hero = () => {
    const lang = locale.value === 'en' ? 'en' : 'ru';

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

            <div class="motion-safe:animate-fade-in lg:max-w-2/3 xl:max-w-1/2">
                <h1
                    key={`${lang}-heading`}
                    class="xs:text-5xl motion-safe:animate-fade-in mb-8 text-4xl font-medium text-balance sm:mb-10 sm:text-6xl"
                >
                    {heading[lang]}
                </h1>
                <p
                    key={`${lang}-subheading`}
                    class="motion-safe:animate-fade-in mb-8 sm:mb-10 lg:mb-12"
                >
                    {intro[lang]}
                </p>

                <HeroActions />
            </div>
        </HeroLayout>
    );
};

export default Hero;

const heading = {
    en: 'Elegant and fast websites',
    ru: 'Элегантные и быстрые сайты',
};
const intro = {
    en: 'Hello there! My name is Ilya, I am a web dev who creates fast and performant websites and web apps with modern and good-looking interfaces',
    ru: 'Здравствуйте! Меня зовут Илья и я - веб-разработчик, создающий быстрые и производительные сайты и веб приложения с красивыми и современными интерфейсами.',
};
