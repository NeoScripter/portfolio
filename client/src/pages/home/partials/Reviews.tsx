import ApiError from '@/components/ui/ApiError';
import { useCarousel } from '@/hooks/useCarousel';
import type { ReviewType } from '@/lib/types/models/reviews';
import { useEffect, useRef } from 'preact/hooks';
import { locale } from '@/signals/locale';
import { cn, range } from '@/lib/helpers/utils';
import ReviewCard, { ReviewFallback } from './ReviewCard';
import CarouselControls from '@/components/ui/CarouselControls';
import { useFetch } from '@/hooks/useFetch';

const Reviews = () => {
    const { fetchData, loading, errors } = useFetch();
    const carouselRef = useRef(null);
    const {
        slides: carouselSlides,
        handleTouchStart,
        animatingSlide,
        handleTouchEnd,
        handleIncrement,
        handleDecrement,
        currentSlide,
        setter,
    } = useCarousel<ReviewType>({
        containerRef: carouselRef,
    });

    useEffect(() => {
        fetchData({
            url: '/api/reviews.json',
            onSuccess: (data) => {
                setter(data.data);
            },
        });
    }, []);

    const listLabel = locale.value === 'ru' ? "Отзывы клиентов" : "Customer reviews";

    if (errors != null)
        return (
            <ApiError
                resourceRu="отзывов клиентов"
                resourceEn="client reviews"
            />
        );

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
                    role="tablist"
                    aria-label={listLabel}
                    aria-live="polite"
                >
                    {!loading
                        ? carouselSlides?.map((review, idx) => (
                              <ReviewCard
                                  key={`${review.id}`}
                                  active={idx === animatingSlide}
                                  review={review}
                              />
                          ))
                        : range(0, 8).map((skeleton) => (
                              <ReviewFallback
                                  key={`review-skeleton-${skeleton}`}
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

export default Reviews;

