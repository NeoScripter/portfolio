import CarouselControls from '@/components/ui/CarouselControls';
import { useCarousel } from '@/hooks/useCarousel';
import { cn } from '@/lib/helpers/utils';
import { useEffect, useRef } from 'preact/hooks';
import { services, type ServiceType } from '../data';
import ServiceCard from './ServiceCard';

const ServiceCarousel = () => {
    const carouselRef = useRef(null);
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
                        '-ml-5 flex w-max items-start gap-6 sm:-ml-15 sm:gap-10 md:-ml-19 lg:-ml-27 lg:gap-13 xl:-ml-47',
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
                handlePrev={handleDecrement}
                handleNext={handleIncrement}
            />
        </div>
    );
};

export default ServiceCarousel;
