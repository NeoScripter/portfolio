import SecondaryHeading from '@/components/ui/SecondaryHeading';
import useThrottle from '@/hooks/useThrottle';
import AppSection from '@/layouts/SectionLayout';
import { playAudio } from '@/lib/helpers/playAudio';
import { cn } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';
import { type FC } from 'preact/compat';
import { useState } from 'preact/hooks';
import { stages } from '../data';
import StageItem from './StageItem';

const Stages: FC<{ className?: string }> = ({ className }) => {
    const [active, setActive] = useState(0);
    const throttledMouseEnter = useThrottle(() => playAudio('hover'), 300);

    const handleMouseEnter = (idx: number) => {
        throttledMouseEnter();
        setActive(idx);
    };
    const handleMouseLeave = () => {
        setActive(0);
    };

    return (
        <AppSection
            className={cn(
                'bg-muted full-bleed relative isolate lg:px-27 xl:gap-18 xl:px-27',
                className,
                'content-visibility-default',
            )}
        >
            <StagesInfo />

            <div class="uneven-grid-rows-wrapper">
                <ul class="uneven-grid-rows mx-auto grid gap-8">
                    {stages.map((stage, idx) => (
                        <StageItem
                            onMouseEnter={() => handleMouseEnter(idx)}
                            onMouseLeave={() => handleMouseLeave()}
                            key={stage.id}
                            active={active === idx}
                            stage={stage}
                            order={idx + 1}
                        />
                    ))}
                </ul>
            </div>
        </AppSection>
    );
};

export default Stages;

const StagesInfo = () => {
    return (
        <div class="mb-18 sm:mb-20.5 md:mx-auto md:max-w-130 lg:mb-24 xl:mx-0 xl:max-w-162">
            <SecondaryHeading
                key={`${locale.value}-heading`}
                className="motion-safe:animate-fade-in xl:text-5xl"
            >
                {locale.value === 'en' ? 'Project stages' : 'Рабочий процесс'}
            </SecondaryHeading>

            <p
                key={`${locale.value}-description`}
                class="motion-safe:animate-fade-in text-balance sm:text-lg xl:text-[1.325rem]"
            >
                {locale.value === 'en'
                    ? 'Each project requires an individual approach based on the requirements. However, this is how I generally structure my collaboration with clients when working on a project.'
                    : 'Каждый проект требует индивидуального подхода, исходя из требований по его реализации. Тем не менее, вот примерная схема того как я обычно организую процесс взаимодействия с клиентами.'}
            </p>
        </div>
    );
};
