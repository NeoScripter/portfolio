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
                Создаю сайты, которые действительно работают
            </SecondaryHeading>
            <p
                key={`${lang}-subheading`}
                class="motion-safe:animate-fade-in max-w-208"
            >
                Я создаю продуманные цифровые решения — от сайтов и
                веб-приложений до автоматизации бизнес-процессов. Помогаю
                превратить идею в работающий продукт: спроектировать
                архитектуру, написать чистый и поддерживаемый код, настроить
                интеграции и обеспечить стабильную работу системы.
            </p>

            <ServiceCarousel />
        </AppSection>
    );
};

export default Services;
