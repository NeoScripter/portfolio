import SecondaryHeading from '@/components/ui/SecondaryHeading';
import AppSection from '@/layouts/SectionLayout';
import ServiceCarousel from './ServiceCarousel';

const Services = () => {
    return (
        <AppSection>
            <SecondaryHeading>
                Создаю сайты, которые действительно работают
            </SecondaryHeading>
            <p class="max-w-208">
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
