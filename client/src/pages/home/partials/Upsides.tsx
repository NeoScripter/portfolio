import SecondaryHeading from '@/components/ui/SecondaryHeading';
import AppSection from '@/layouts/SectionLayout';
import { cn } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';
import type { FC } from 'preact/compat';
import { upsides, type UpsideType } from '../data';

const Upsides = () => {
    const lang = locale.value === 'en' ? 'en' : 'ru';

    return (
        <AppSection>
            <SecondaryHeading
                key={`${lang}-heading`}
                className="motion-safe:animate-fade-in text-balance"
            >
                {lang === 'en'
                    ? 'Why should you hire me?'
                    : 'Преимущества работы со мной'}
            </SecondaryHeading>
            <p
                key={`${lang}-subheading`}
                class="motion-safe:animate-fade-in max-w-208"
            >
                Я специализируюсь на создании качественных и надежных сайтов. За
                годы работы я помог многим клиентам реализовать их проекты — от
                простых портфолио до сложных интернет-магазинов.
            </p>

            <div className="mt-16 sm:mt-19">
                <ul
                    className={cn(
                        'grid gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-15 md:py-5 lg:grid-cols-3 lg:gap-x-28 lg:gap-y-17 lg:py-8 xl:gap-x-32 xl:gap-y-30 xl:py-12',
                    )}
                >
                    {upsides.map((upside) => (
                        <UpsideCard key={upside.id} upside={upside} />
                    ))}
                </ul>
            </div>
        </AppSection>
    );
};

export default Upsides;

const UpsideCard: FC<{ upside: UpsideType }> = ({
    upside: { icon: Icon, description },
}) => {
    const lang = locale.value === 'ru' ? 'ru' : 'en';

    return (
        <li>
            <Icon
                strokeWidth={1.5}
                class="mx-auto mb-3 size-8 sm:mb-4.5 sm:ml-0 lg:mb-6 xl:mb-7 xl:size-12"
            />
            <p
                key={`${lang}-content`}
                class="motion-safe:animate-fade-in mx-auto max-w-110 text-center text-balance sm:mx-0 sm:max-w-full sm:text-left"
            >
                {description[lang]}
            </p>
        </li>
    );
};
