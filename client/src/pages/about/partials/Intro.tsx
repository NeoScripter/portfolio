
import SecondaryHeading from '@/components/ui/SecondaryHeading';
import AppSection from '@/layouts/SectionLayout';
import { cn } from '@/lib/helpers/utils';
import type { FC } from 'preact/compat';
import TechStack from './TechStack';

const Intro: FC<{ className?: string }> = ({ className }) => {
    return (
        <AppSection
            className={cn(
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
