import SecondaryHeading from '@/components/ui/SecondaryHeading';
import AppSection from '@/layouts/SectionLayout';
import { cn } from '@/lib/helpers/utils';
import { type FC } from 'preact/compat';
import { useState } from 'preact/hooks';
import { stages } from '../data';
import StageItem from './StageItem';

const Stages: FC<{ className?: string }> = ({ className }) => {
    const [active, setActive] = useState(0);

    const handleMouseEnter = (idx: number) => {
        setActive(idx);
    };
    const handleMouseLeave = () => {
        setActive(0);
    };

    return (
        <AppSection
            className={cn(
                'bg-muted full-bleed relative isolate lg:px-27 xl:flex xl:items-center xl:gap-18 xl:px-27',
                className,
                'content-visibility-default',
            )}
        >
            <StagesInfo />

            <ul class="mx-auto grid w-fit justify-items-center gap-8 md:grid-cols-2 md:gap-x-10 md:gap-y-2 xl:mx-0 xl:gap-x-6 xl:gap-y-0 2xl:mx-auto 2xl:max-w-198">
                {stages.map((stage, idx) => (
                    <StageItem
                        onMouseEnter={() => handleMouseEnter(idx)}
                        onMouseLeave={() => handleMouseLeave()}
                        key={stage.id}
                        active={active === idx}
                        stage={stage}
                        order={idx + 1}
                        isEven={(idx + 1) % 2 === 0}
                    />
                ))}
            </ul>
        </AppSection>
    );
};

export default Stages;

const StagesInfo = () => {
    return (
        <div class="mb-18 sm:mb-20.5 md:mx-auto md:max-w-155 xl:mx-0 xl:mb-0 xl:max-w-123.5 2xl:max-w-162">
            <SecondaryHeading className="text-center xl:text-left xl:text-5xl">
                Рабочий процесс
            </SecondaryHeading>

            <p class="mb-8 text-center text-balance sm:mb-10 sm:text-lg lg:mb-12 xl:text-left xl:text-base 2xl:text-[1.325rem]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                purus arcu, varius eget velit non, laoreet imperdiet orci.
                Mauris ultrices eget lorem ac vestibulum. Suspendis imperdiet,
            </p>
        </div>
    );
};
