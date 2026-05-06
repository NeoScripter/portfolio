import { cn } from '@/lib/helpers/utils';

const OptimizedVideo = () => (
    <div class="absolute right-0 bottom-[clamp(96px,27vw,160px)] w-[clamp(350px,100vw,100%)] -z-4 xs:w-[clamp(455px,81vw,520px)] xs:bottom-[clamp(105px,19vw,110px)] sm:bottom-[145px] sm:w-[630px] md:bottom-[-42px] md:h-[500px] md:w-[81%] lg:bottom-[132px] lg:h-auto lg:w-[740px] xl:top-[173px] xl:bottom-auto xl:w-[740px]">
        <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/thumbnail.webp"
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
