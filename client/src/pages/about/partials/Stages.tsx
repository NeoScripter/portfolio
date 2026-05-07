import SecondaryHeading from '@/components/ui/SecondaryHeading';
import useThrottle from '@/hooks/useThrottle';
import AppSection from '@/layouts/SectionLayout';
import { playAudio } from '@/lib/helpers/playAudio';
import { cn } from '@/lib/helpers/utils';
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
        </AppSection>
    );
};

export default Stages;

const StagesInfo = () => {
    return (
        <div class="mb-18 sm:mb-20.5 md:mx-auto md:max-w-155 lg:mb-24 xl:mx-0 xl:max-w-162">
            <SecondaryHeading className="text-center xl:text-left xl:text-5xl">
                Рабочий процесс
            </SecondaryHeading>

            <p class="text-center text-balance sm:text-lg xl:text-left xl:text-[1.225rem]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                purus arcu, varius eget velit non, laoreet imperdiet orci.
                Mauris ultrices eget lorem ac vestibulum. Suspendis imperdiet,
            </p>
        </div>
    );
};
