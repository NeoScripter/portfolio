import Quote from '@/assets/svgs/Quote';
import AppSection from '@/layouts/SectionLayout';
import { cn } from '@/lib/helpers/utils';
import type { NodeProps } from '@/lib/types/shared';
import { locale } from '@/signals/locale';
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
                <p
                    key={`${locale.value}-quote`}
                    class="motion-safe:animate-fade-in mx-auto 2xl:max-w-9/10 text-center text-balance sm:text-xl xl:text-3xl 2xl:text-4xl"
                >
                    {locale.value === 'en'
                        ? 'Nothing worthwhile comes easily. Half effort does not produce half results. It produces no results. Continuous and hard work is the only way to accomplish results that last.'
                        : 'Любая вещь, имеющая ценность, требует приложенных усилий. Половина приложенных усилий не означает получение половины результата. Она означает отсутствие результата. Единственный способ получения качественного результата - это кропотливая и упорная работа.'}
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
