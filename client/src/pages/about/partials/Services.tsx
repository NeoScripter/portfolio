import clickSound from '@/assets/audio/click.mp3';
import { Button } from '@/components/ui/Button';
import SecondaryHeading from '@/components/ui/SecondaryHeading';
import { useModal } from '@/context/ModalContext';
import AppSection from '@/layouts/SectionLayout';
import { events } from '@/lib/const/events';
import { cn, playAudio } from '@/lib/helpers/utils';
import type { FC } from 'preact/compat';
import ServiceList from './ServiceList';

const Services: FC<{ className?: string }> = ({ className }) => {
    return (
        <AppSection
            className={cn(
                'relative isolate xl:flex xl:items-center xl:gap-21 xl:px-0 2xl:gap-16',
                className,
            )}
        >
            <ServicesInfo />
            <ServiceList />
        </AppSection>
    );
};

export default Services;

const ServicesInfo = () => {
    const { showModal } = useModal();

    const handleClick = () => {
        window.dispatchEvent(
            new CustomEvent(events.CHANGE_FORM_STATUS, { detail: 'cancel' }),
        );
        showModal.value = true;
        playAudio(clickSound);
    };

    return (
        <div class="mb-18 sm:mb-20.5 lg:mx-auto lg:max-w-155 xl:mx-0  pl-1 xl:mb-0 xl:max-w-123.5 2xl:max-w-187">
            <SecondaryHeading className="xl:text-5xl">
                Что я делаю?
            </SecondaryHeading>

            <p class="mb-8 text-balance sm:mb-10 sm:text-lg lg:mb-12 xl:text-left xl:text-base 2xl:text-[1.325rem]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                purus arcu, varius eget velit non, laoreet imperdiet orci.
                Mauris ultrices eget lorem ac vestibulum. Suspendis imperdiet,
            </p>
            <Button
                class="text-foreground hover:ring-muted-foreground/40 focus-visible:ring-muted-foreground/40 border-muted-none hover:bg-zinc-700/20 xl:text-lg 2xl:text-[1.325rem]"
                onClick={handleClick}
                variant="hero"
            >
                Нанять меня
            </Button>
        </div>
    );
};
