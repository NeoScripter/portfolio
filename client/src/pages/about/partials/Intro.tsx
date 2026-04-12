
import SecondaryHeading from '@/components/ui/SecondaryHeading';
import AppSection from '@/layouts/SectionLayout';
import { cn } from '@/lib/helpers/utils';
import type { FC } from 'preact/compat';
import TechStack from './TechStack';

const Intro: FC<{ className?: string }> = ({ className }) => {
    return (
        <AppSection
            className={cn(
                // 'py-14 sm:pt-19 sm:pb-12 lg:pt-17 lg:pb-22 xl:pb-18',
                className,
            )}
        >
            <SecondaryHeading className="xs:text-center xs:text-balance">
                Языки и фреймворки, которые я использую
            </SecondaryHeading>

            <TechStack />
        </AppSection>
    );
};

export default Intro;
