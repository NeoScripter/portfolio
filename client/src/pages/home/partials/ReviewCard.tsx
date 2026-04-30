import AdaptiveImg from '@/components/ui/AdaptiveImg';
import { cn } from '@/lib/helpers/utils';
import type { ReviewType } from '@/lib/types/models/reviews';
import { locale } from '@/signals/locale';
import type { FC } from 'preact/compat';

const ReviewCard: FC<{ review: ReviewType; active: boolean }> = ({
    review: { attr, image },
    active,
}) => {
    const lang = locale.value === 'ru' ? 'ru' : 'en';

    return (
        <li
            class={cn(
                'bg-muted review-slide border-accent-foreground/15 ease flex flex-col items-start gap-8 rounded-xl border py-7.5 pr-7 pl-6 transition-opacity duration-500 ease-in select-none sm:flex-row sm:gap-10.5 sm:py-12 sm:pr-18 sm:pl-8 sm:text-base md:items-start lg:gap-12 lg:pt-12 lg:pr-17 lg:pb-18 lg:pl-10.5 lg:text-xl xl:pb-13',
                !active && 'opacity-30',
            )}
            role="tabpanel"
            aria-label={`Review by ${attr.author[lang]}`}
            aria-hidden={!active}
            tabIndex={active ? 0 : -1}
        >
            {image && (
                <AdaptiveImg
                    prtClass="size-32 md:size-40 lg:size-51 shrink-0 rounded-full"
                    alt={image.alt?.[lang]}
                    srcs={image.srcSet}
                />
            )}
            <div>
                <blockquote
                    className={cn(
                        'overflow-clip transition-[max-height] duration-500 ease-in-out',
                        active ? 'max-h-500' : 'max-h-80',
                    )}
                >
                    <p class="mb-6">{attr.description[lang]}</p>
                </blockquote>
                <p class={cn('font-bold md:text-xl xl:text-[1.325rem]')}>
                    <cite class="not-italic">{attr.author[lang]}</cite>
                </p>
            </div>
        </li>
    );
};

export default ReviewCard;

export const ReviewFallback = () => {
    return (
        <li
            class={cn(
                'bg-muted review-slide border-accent-foreground/15 ease flex flex-col items-start gap-8 rounded-xl border py-7.5 pr-7 pl-6 select-none sm:flex-row sm:gap-10.5 sm:py-12 sm:pr-18 sm:pl-8 sm:text-base md:items-center lg:gap-12 lg:pt-12 lg:pr-17 lg:pb-18 lg:pl-10.5 lg:text-xl xl:pb-13',
            )}
        >
            <div class="skeleton size-32 shrink-0 animate-pulse rounded-full md:size-40 lg:size-51" />
            <div>
                <p class="skeleton mb-6">
                    Lorem ipsum dolor sit amet consectetur. In enim cursus odio
                    accumsan. Id leo urna velit neque mattis id tellus arcu
                    condimentum. Augue dictum dolor elementum convallis
                    dignissim malesuada commodo ultrices.
                </p>

                <p class="skeleton w-40 animate-pulse font-bold md:text-xl xl:text-[1.325rem]">
                    Lorem
                </p>
            </div>
        </li>
    );
};
