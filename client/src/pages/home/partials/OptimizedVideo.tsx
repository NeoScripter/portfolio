import { cn } from '@/lib/helpers/utils';

const OptimizedVideo = () => (
    <div class="xs:w-[clamp(28.438rem,81vw,32.500rem)] xs:bottom-[clamp(6.563rem,19vw,6.875rem)] absolute right-0 bottom-[clamp(6.025rem,27vw,10rem)] -z-4 w-[clamp(21.875rem,100vw,100%)] sm:bottom-[9.063rem] sm:w-[39.375rem] md:bottom-[-2.625rem] md:h-[31.250rem] md:w-[81%] lg:bottom-[8.250rem] lg:h-auto lg:w-[46.250rem] xl:top-[10.813rem] xl:bottom-auto xl:w-[46.250rem]">
        <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/videos/preview.webp"
            className={cn('size-full object-cover')}
        >
            <source
                src="/videos/hero.av1.webm"
                type='video/webm; codecs="av01"'
            />
            <source src="/videos/hero.webm" type="video/webm; codecs=vp9" />
            <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
    </div>
);

export default OptimizedVideo;
