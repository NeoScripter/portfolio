import CarouselControls from '@/components/ui/CarouselControls';
import { useCarousel } from '@/hooks/useCarousel';
import { cn } from '@/lib/helpers/utils';
import { useEffect, useRef } from 'preact/hooks';
import { services, type ServiceType } from '../data';
import ServiceCard from './ServiceCard';

const ServiceCarousel = () => {
    const carouselRef = useRef<HTMLUListElement | null>(null);

    const {
        slides: carouselSlides,
        animatingSlide,
        handleTouchStart,
        handleTouchEnd,
        handleIncrement,
        handleDecrement,
        currentSlide,
        setter,
    } = useCarousel<ServiceType>({
        containerRef: carouselRef,
    });

    const handleClick = (cb: () => void) => {
        cb();

        if (!carouselRef.current) return;

        carouselRef.current.scrollIntoView({
            block: 'start',
        });
    };

    useEffect(() => {
        setter(services);
    }, [services]);

    return (
        <div>
            <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative mt-16 mb-13 sm:my-19 lg:mb-23"
            >
                <ul
                    ref={carouselRef}
                    className={cn(
                        '-ml-5 flex w-max scroll-m-30 items-start gap-6 sm:-ml-15 sm:scroll-m-40 sm:gap-10 md:-ml-19 lg:-ml-27 lg:scroll-m-50 lg:gap-13 xl:-ml-47',
                    )}
                >
                    {carouselSlides?.map((service, idx) => (
                        <ServiceCard
                            key={service.id}
                            active={idx === animatingSlide}
                            service={service}
                        />
                    ))}
                </ul>
            </div>

            <CarouselControls
                current={currentSlide}
                slides={carouselSlides.length}
                handlePrev={() => handleClick(handleDecrement)}
                handleNext={() => handleClick(handleIncrement)}
            />
        </div>
    );
};

export default ServiceCarousel;
