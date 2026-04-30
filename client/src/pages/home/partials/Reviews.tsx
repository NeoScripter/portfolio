import ApiError from '@/components/ui/ApiError';
import CarouselControls from '@/components/ui/CarouselControls';
import { useCarousel } from '@/hooks/useCarousel';
import { useFetch } from '@/hooks/useFetch';
import { API_BASE_URL } from '@/lib/const/api';
import { cn, hasErrorDetails, range } from '@/lib/helpers/utils';
import type { ReviewType } from '@/lib/types/models/reviews';
import { locale } from '@/signals/locale';
import { useEffect, useRef } from 'preact/hooks';
import ReviewCard, { ReviewFallback } from './ReviewCard';

const Reviews = () => {
    const { fetchData, loading, errors } = useFetch();
    const carouselRef = useRef<HTMLUListElement | null>(null);
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
            url: `${API_BASE_URL}reviews?duplicated=true`,
            onSuccess: (data) => {
                setter(data.data);
            },
        });
    }, []);

    const handleClick = (cb: () => void) => {
        cb();

        if (!carouselRef.current) return;

        carouselRef.current.scrollIntoView({
            block: 'start',
        });
    };

    const listLabel =
        locale.value === 'ru' ? 'Отзывы клиентов' : 'Customer reviews';
    const numSlides = Math.floor(carouselSlides.length / 2);

    if (hasErrorDetails(errors))
        return (
            <ApiError
                resourceRu="отзывов клиентов"
                resourceEn="client reviews"
                mt={true}
            />
        );

    return (
        <div className="full-bleed">
            <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative mt-16 mb-13 sm:my-19 lg:mb-23"
            >
                <ul
                    ref={carouselRef}
                    className={cn(
                        '-ml-5 flex w-max scroll-m-30 items-start gap-6 sm:-ml-15 sm:scroll-m-40 sm:gap-10 lg:-ml-22 lg:scroll-m-50 lg:gap-13',
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
                current={(currentSlide % numSlides) + 1}
                slides={numSlides}
                handlePrev={() => handleClick(handleDecrement)}
                handleNext={() => handleClick(handleIncrement)}
            />
        </div>
    );
};

export default Reviews;
