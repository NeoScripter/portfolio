import { cn } from '@/lib/helpers/utils';
import type { NodeProps } from '@/lib/types/shared';
import type { FC } from 'preact/compat';
import AppSection from './SectionLayout';

const HeroLayout: FC<NodeProps> = ({ className, children }) => {
    return (
        <AppSection
            className={cn(
                'relative isolate overflow-clip rounded-xl pt-12 pb-15.5 sm:pt-14 sm:pb-25 lg:pt-12 xl:pt-20.5 xl:pb-28',
                className,
            )}
        >
            {children}
        </AppSection>
    );
};

export default HeroLayout;
// first-of-type:pt-36 first-of-type:lg:pt-50

