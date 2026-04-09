import SecondaryHeading from '@/components/ui/SecondaryHeading';
import AppSection from '@/layouts/SectionLayout';
import Reviews from './Reviews';

const Intro = () => {
    return (
        <AppSection className="py-14 sm:pt-19 sm:pb-12 lg:pt-17 lg:pb-22 xl:pb-18">
            <SecondaryHeading>
                Уникальные и профессиональные сайты, которые невозможно не
                заметить
            </SecondaryHeading>

            <p class="max-w-208">
                Я специализируюсь на создании качественных и надежных сайтов. За
                годы работы я помог многим клиентам реализовать их проекты — от
                простых портфолио до сложных интернет-магазинов.
            </p>

            <Reviews />
        </AppSection>
    );
};

export default Intro;
