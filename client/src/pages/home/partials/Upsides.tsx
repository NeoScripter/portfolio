import AdaptiveImg from '@/components/ui/AdaptiveImg';
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
                {lang === 'en' ? 'How I work' : 'Принципы моей работы'}
            </SecondaryHeading>
            <p
                key={`${lang}-subheading`}
                class="motion-safe:animate-fade-in max-w-208"
            >
                {lang === 'en'
                    ? 'Over the years of working with clients, I have developed a set of principles that guide me during my collaboraition with clients.'
                    : 'За годы работы с клиентами, я выработал для себя несколько важных принципов, которых я всегда стараюсь придерживаться при деловом сотрудничестве.'}
            </p>

            <div className="mt-16 sm:mt-19">
                <ul
                    className={cn(
                        'justsify-items-center grid gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-15 md:py-5 lg:grid-cols-3 lg:gap-x-28 lg:gap-y-17 lg:py-8 xl:gap-x-32 xl:gap-y-30 xl:py-12',
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
    upside: { icon, description },
}) => {
    const lang = locale.value === 'ru' ? 'ru' : 'en';

    return (
        <li class="mx-auto w-fit">
            <AdaptiveImg
                srcs={icon}
                prtClass="max-w-55 h-28 mx-auto mb-3 sm:-translate-x-[7%] lg:h-32 sm:mb-4 dark:invert"
                imgClass="object-contain"
            />
            <p
                key={`${lang}-content`}
                class="motion-safe:animate-fade-in max-w-110 sm:mx-0 sm:max-w-full"
            >
                {description[lang]}
            </p>
        </li>
    );
};
