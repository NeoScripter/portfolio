import { cn, range } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';
import { ChevronLeft } from 'lucide-preact';
import type { FC } from 'preact/compat';

const CarouselControls: FC<{
    current: number;
    slides: number;
    className?: string;
    handlePrev: () => void;
    handleNext: () => void;
}> = ({ className, handleNext, handlePrev, slides, current }) => {
    const navLabel =
        locale.value === 'ru' ? 'Навигация карусели' : 'Carousel navigation';

    return (
        <nav
            class={cn(
                'flex items-center justify-center gap-5 md:mx-auto md:max-w-240 md:justify-between',
                className,
            )}
            aria-label={navLabel}
        >
            <CarouselBtn onClick={handlePrev} className="" />

            <div class="flex items-center justify-center gap-2">
                {range(1, slides).map((dot) => (
                    <SlideMarker
                        key={dot}
                        slideNumber={current}
                        active={dot === current}
                    />
                ))}
            </div>

            <CarouselBtn onClick={handleNext} className="rotate-180" />
        </nav>
    );
};

export default CarouselControls;

const CarouselBtn: FC<{ className?: string; onClick: () => void }> = ({
    className,
    onClick,
}) => {
    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        onClick();
    }
    return (
        <button onClick={handleClick} class={cn('xs:block hidden', className)}>
            <ChevronLeft
                strokeWidth={3}
                class="size-12 text-gray-300 md:size-15"
                aria-hidden="true"
            />
        </button>
    );
};

const SlideMarker: FC<{ active: boolean; slideNumber: number }> = ({
    active,
    slideNumber,
}) => {
    const markerLabel = active
        ? locale.value === 'ru'
            ? `Текущий слайд, слайд ${slideNumber}`
            : `Current slide, slide ${slideNumber}`
        : locale.value === 'ru'
          ? `Слайд ${slideNumber}`
          : `Slide ${slideNumber}`;
    return (
        <div
            class={cn(
                'h-2 w-8 max-w-12 min-w-6 flex-1 rounded-sm bg-gray-300 md:h-3 md:w-12',
                active && 'bg-slide-marker',
            )}
            role="presentation"
            aria-label={markerLabel}
        />
    );
};
