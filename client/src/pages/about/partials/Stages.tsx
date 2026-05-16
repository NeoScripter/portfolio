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
                'bg-muted full-bleed relative isolate px-4 lg:px-(--padding) xl:gap-18',
                className,
                'content-visibility-default',
            )}
        >
            <StagesInfo />

            <div class="@container w-full">
                <ul class="grid items-start gap-8 @min-[47rem]:auto-rows-[30rem] @min-[47rem]:grid-cols-[repeat(auto-fill,minmax(22.5rem,1fr))] @min-[47rem]:items-center @min-[71.5rem]:gap-y-0 @min-[71.5rem]:auto-rows-[35rem] @min-[72.5rem]:gap-x-10 @min-[97.5rem]:auto-rows-[38rem] @min-[97.5rem]:grid-cols-3 @min-[97.5rem]:gap-x-14">
                    {stages.map((stage, idx) => (
                        <StageItem
                            onMouseEnter={() => handleMouseEnter(idx)}
                            onMouseLeave={() => handleMouseLeave()}
                            key={stage.id}
                            active={active === idx}
                            stage={stage}
                            order={idx + 1}
                            className="@min-[47rem]:min-h-108 @min-[47rem]:@max-[71.5rem]:odd:self-start @min-[47rem]:@max-[71.5rem]:even:self-end @min-[71.5rem]:min-h-120 @min-[71.5rem]:nth-[3n]:self-end @min-[71.5rem]:nth-[3n-2]:self-start @min-[97.5rem]:min-h-124"
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
                className="motion-safe:animate-fade-in mb-5 sm:mb-9 xl:mb-9 xl:text-5xl"
            >
                {locale.value === 'en' ? 'Project stages' : 'Рабочий процесс'}
            </SecondaryHeading>

            <p
                key={`${locale.value}-description`}
                // class="motion-safe:animate-fade-in text-balance sm:text-lg lg:mb-12 2xl:text-xl"
                class="motion-safe:animate-fade-in text-balance lg:mb-12"
            >
                {locale.value === 'en'
                    ? 'Each project requires an individual approach based on the requirements. However, this is how I generally structure my collaboration with clients when working on a project.'
                    : 'Каждый проект требует индивидуального подхода, исходя из требований по его реализации. Тем не менее, вот примерная схема того как я обычно организую процесс взаимодействия с клиентами.'}
            </p>
        </div>
    );
};
