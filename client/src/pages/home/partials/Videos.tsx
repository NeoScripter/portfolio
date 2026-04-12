import ApiError from '@/components/ui/ApiError';
import { useCarousel } from '@/hooks/useCarousel';
import { useFetch } from '@/hooks/useFetch';
import AppSection from '@/layouts/SectionLayout';
import { cn, range } from '@/lib/helpers/utils';
import type { VideoType } from '@/lib/types/models/videos';
import { useEffect, useRef } from 'preact/hooks';
import VideoTile, { VideoFallback } from './VideoTile';
import CarouselControls from '@/components/ui/CarouselControls';

const Videos = () => {
    const { fetchData, loading, errors } = useFetch();
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
    } = useCarousel<VideoType>({
        containerRef: carouselRef,
    });

    useEffect(() => {
        fetchData({
            url: '/api/videos.json',
            onSuccess: (data) => {
                setter(data.data);
            },
        });
    }, []);

    if (errors != null)
        return (
            <ApiError resourceRu="видео проектов" resourceEn="video projects" />
        );

    const slides =
        carouselSlides.length < 6
            ? [...carouselSlides, ...carouselSlides]
            : carouselSlides;

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
                        'flex w-max items-start md:-ml-5 lg:-ml-27 xl:-ml-47',
                        {
                            'gap-2 sm:gap-5 md:gap-8 xl:gap-10': loading,
                        },
                    )}
                >
                    {!loading
                        ? slides.map((video, idx) => (
                              <VideoTile
                                  key={idx}
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
                current={currentSlide}
                slides={carouselSlides.length}
                handlePrev={handleDecrement}
                handleNext={handleIncrement}
            />
        </AppSection>
    );
};

export default Videos;
