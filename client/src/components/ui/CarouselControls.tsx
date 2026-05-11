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
            <CarouselBtn onClick={handlePrev} label="Previous slide" />

            <ol class="flex items-center justify-center gap-2">
                {range(1, slides).map((dot) => (
                    <SlideMarker key={dot} active={dot === current} />
                ))}
            </ol>

            <CarouselBtn
                onClick={handleNext}
                className="rotate-180"
                label="Next slide"
            />
        </nav>
    );
};

export default CarouselControls;

const CarouselBtn: FC<{
    className?: string;
    onClick: () => void;
    label: string;
}> = ({ className, onClick, label }) => {
    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        onClick();
    };
    return (
        <button
            aria-label={label}
            onClick={handleClick}
            class={cn('xs:block hidden', className)}
        >
            <ChevronLeft
                strokeWidth={3}
                class="size-12 text-gray-300 md:size-15"
                aria-hidden="true"
            />
        </button>
    );
};

const SlideMarker: FC<{ active: boolean }> = ({ active }) => {
    return (
        <li
            class={cn(
                'h-2 w-3 max-w-12 min-w-6 flex-1 rounded-sm bg-gray-300 sm:w-8 md:h-3 md:w-12',
                active && 'bg-slide-marker',
            )}
        />
    );
};
