import ApiError from '@/components/ui/ApiError';
import CarouselControls from '@/components/ui/CarouselControls';
import { useCarousel } from '@/hooks/useCarousel';
import { useFetch } from '@/hooks/useFetch';
import AppSection from '@/layouts/SectionLayout';
import { API_BASE_URL } from '@/lib/const/api';
import { cn, hasErrorDetails, range } from '@/lib/helpers/utils';
import type { VideoType } from '@/lib/types/models/videos';
import { useEffect, useRef } from 'preact/hooks';
import VideoTile, { VideoFallback } from './VideoTile';

const Videos = () => {
    const { fetchData, loading, errors } = useFetch();
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
    } = useCarousel<VideoType>({
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
        fetchData({
            url: `${API_BASE_URL}videos?duplicated=false`,
            onSuccess: (data) => {
                setter(data.data);
            },
        });
    }, []);

    if (hasErrorDetails(errors))
        return (
            <ApiError resourceRu="видео проектов" resourceEn="video projects" />
        );

    const numSlides = Math.floor(carouselSlides.length / 2);

    if (numSlides === 0) {
        return null;
    }

    return (
        <AppSection>
            <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative mt-16 mb-40 sm:mt-19"
            >
                <ul
                    ref={carouselRef}
                    className={cn(
                        'flex w-max scroll-m-30 items-start sm:scroll-m-40 md:-ml-5 lg:-ml-27 lg:scroll-m-50 xl:-ml-47',
                        {
                            'gap-2 sm:gap-5 md:gap-8 xl:gap-10': loading,
                        },
                    )}
                >
                    {!loading
                        ? carouselSlides.map((video, idx) => (
                              <VideoTile
                                  key={video.id}
                                  active={idx === animatingSlide}
                                  leftNei={idx === animatingSlide - 1}
                                  rightNei={idx === animatingSlide + 1}
                                  video={video}
                              />
                          ))
                        : range(0, 8).map((skeleton) => (
                              <VideoFallback
                                  key={`video-skeleton-${skeleton}`}
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
        </AppSection>
    );
};

export default Videos;
