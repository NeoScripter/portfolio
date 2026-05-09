import SecondaryHeading from '@/components/ui/SecondaryHeading';
import AppSection from '@/layouts/SectionLayout';
import { locale } from '@/signals/locale';
import ServiceCarousel from './ServiceCarousel';

const Services = () => {
    const lang = locale.value === 'en' ? 'en' : 'ru';

    return (
        <AppSection>
            <SecondaryHeading
                key={`${lang}-heading`}
                className="motion-safe:animate-fade-in text-balance"
            >
                {lang === 'en'
                    ? 'Various website categories'
                    : 'Различные категории сайтов'}
            </SecondaryHeading>
            <p
                key={`${lang}-subheading`}
                class="motion-safe:animate-fade-in max-w-208"
            >
                {lang === 'en'
                    ? 'There are various website categories. All of them are different in terms of the scale and complexity. Here are the categories of the websites that I have worked on.'
                    : 'Существует большое количество различных категорий вебсайтов. Все они кардинально отличаются друг от друга в зависимости от объема и сложности функционала. Вот категории сайтов, с которыми мне доводилось работать.'}
            </p>

            <ServiceCarousel />
        </AppSection>
    );
};

export default Services;
