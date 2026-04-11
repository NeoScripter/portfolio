import AdaptiveImg from '@/components/ui/AdaptiveImg';
import SecondaryHeading from '@/components/ui/SecondaryHeading';
import AppSection from '@/layouts/SectionLayout';
import { cn } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';
import type { FC } from 'preact/compat';
import { journeyItems, type JourneyItemType } from '../data';

const Journey: FC<{ className?: string }> = ({ className }) => {
    return (
        <AppSection
            className={cn(
                'full-bleed px-0 pt-14 sm:px-0 sm:pt-19 lg:px-0 lg:pt-17',
                className,
            )}
        >
            <SecondaryHeading className="xs:text-center xs:text-balance">
                Как я стал программистом
            </SecondaryHeading>

            <div class="mt-16 mb-13 space-y-11 sm:my-19 sm:space-y-16 lg:mb-23 xl:mt-25 xl:space-y-22">
                {journeyItems.map((item, idx) => (
                    <JourneyItem
                        key={item.id}
                        item={item}
                        isEven={(idx + 1) % 2 === 0}
                    />
                ))}
            </div>
        </AppSection>
    );
};

export default Journey;

const JourneyItem: FC<{ item: JourneyItemType; isEven: boolean }> = ({
    item,
    isEven,
}) => {
    const lang = locale.value === 'ru' ? 'ru' : 'en';

    return (
        <div
            class={cn('xl:flex xl:items-stretch 2xl:px-23 xl:gap-16', {
                'xl:pl-23': isEven,
                'xl:pr-23': !isEven,
            })}
        >
            <AdaptiveImg
                srcs={item.img}
                alt={item.text[lang]}
                prtClass={cn(
                    'mb-9 max-w-175 sm:mb-16 xl:mb-0 xl:max-w-129 xl:shrink-0',
                    {
                        'sm:ml-auto xl:order-2': isEven,
                        'sm:mr-auto': !isEven,
                    },
                )}
                imgClass={cn('2xl:rounded-[1.5rem]', {
                    'md:rounded-l-[1.5rem]': isEven,
                    'md:rounded-r-[1.5rem]': !isEven,
                })}
            />
            <div
                class="prose sm:prose-base prose-sm lg:prose-lg 2xl:prose-xl text-foreground [&>h2]:text-foreground max-w-full self-center px-5 sm:px-15 xl:px-0"
                dangerouslySetInnerHTML={{
                    __html: item.text[lang] || '',
                }}
            />
        </div>
    );
};
