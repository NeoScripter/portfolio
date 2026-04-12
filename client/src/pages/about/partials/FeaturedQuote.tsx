import Quote from '@/assets/svgs/Quote';
import AppSection from '@/layouts/SectionLayout';
import { cn } from '@/lib/helpers/utils';
import type { NodeProps } from '@/lib/types/shared';
import type { FC } from 'preact/compat';

const FeaturedQuote: FC<{ className?: string }> = ({ className }) => {
    return (
        <AppSection
            className={cn(
                'relative isolate flex flex-wrap pt-20 pb-40 sm:pb-48 lg:pb-50 xl:pb-60',
                className,
            )}
        >
            <blockquote class="relative isolate m-auto mx-auto max-w-9/10 sm:max-w-147 lg:max-w-208 2xl:max-w-307">
                <p class="text-center text-balance sm:text-xl xl:text-3xl 2xl:text-4xl">
                    Я специализируюсь на создании качественных и надежных
                    сайтов. За годы работы я помог многим клиентам реализовать
                    их проекты — от простых портфолио до сложных
                    интернет-магазинов.
                </p>

                <QuoteGlyph className="-right-10 -bottom-20 xl:-right-20 2xl:-right-5" />
                <QuoteGlyph className="-top-15 -left-10 rotate-180 xl:-left-20 2xl:-left-5" />
            </blockquote>
        </AppSection>
    );
};

export default FeaturedQuote;

const QuoteGlyph: FC<NodeProps> = ({ className }) => {
    return (
        <span
            aria-hidden="true"
            class={cn(
                'absolute block size-15 select-none xl:size-19 2xl:size-22',
                className,
            )}
        >
            <Quote className="size-full" />
        </span>
    );
};
