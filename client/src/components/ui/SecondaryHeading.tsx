import { cn } from '@/lib/helpers/utils';
import type { ComponentChildren } from 'preact';
import type { FC } from 'preact/compat';

const SecondaryHeading: FC<{
    className?: string;
    children: ComponentChildren;
}> = ({ className, children }) => {
    return (
        <h2
            class={cn(
                'xs:text-4xl xs:mb-8 mb-6 text-3xl font-medium text-balance sm:mb-10 sm:text-5xl xl:mb-12 xl:text-6xl',
                className,
            )}
        >
            {children}
        </h2>
    );
};

export default SecondaryHeading;
