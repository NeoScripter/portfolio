import SecondaryHeading from '@/components/ui/SecondaryHeading';
import AppSection from '@/layouts/SectionLayout';
import { cn } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';
import type { FC } from 'preact/compat';
import TechStack from './TechStack';

const Intro: FC<{ className?: string }> = ({ className }) => {
    return (
        <AppSection className={cn(className)}>
            <SecondaryHeading
                key={`${locale.value}-subheading`}
                className="xs:text-center xs:text-balance motion-safe:animate-fade-in"
            >
                {locale.value === 'en'
                    ? 'My tech stack'
                    : 'Языки и фреймворки, которые я использую'}
            </SecondaryHeading>

            <TechStack />
        </AppSection>
    );
};

export default Intro;
