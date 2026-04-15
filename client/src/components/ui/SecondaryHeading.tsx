import { cn } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';
import type { ComponentChildren } from 'preact';
import type { FC } from 'preact/compat';

const SecondaryHeading: FC<{
    className?: string;
    children: ComponentChildren;
}> = ({ className, children }) => {
    const lang = locale.value === 'en' ? 'en' : 'ru';

    return (
        <h2
            key={`${lang}-subheader`}
            class={cn(
                'xs:text-4xl motion-safe:animate-fade-in xs:mb-8 mb-6 text-3xl font-medium text-balance hyphens-auto sm:mb-10 sm:text-5xl xl:mb-12 xl:text-5xl',
                className,
            )}
        >
            {children}
        </h2>
    );
};

export default SecondaryHeading;
