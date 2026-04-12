import PlayBtn from '@/assets/svgs/play-btn.svg';
import AdaptiveImg from '@/components/ui/AdaptiveImg';
import { cn } from '@/lib/helpers/utils';
import type { VideoType } from '@/lib/types/models/videos';
import { locale } from '@/signals/locale';
import{ type FC } from 'preact/compat';
import{ useState } from 'preact/hooks';

const VideoTile: FC<{
    video: VideoType;
    active: boolean;
    leftNei: boolean;
    rightNei: boolean;
}> = ({ video, active, leftNei, rightNei }) => {
    const lang = locale.value === 'ru' ? 'ru' : 'en';

    const [loaded, setLoaded] = useState(false);

    const Iframe = () => {
        return (
            <iframe
                width="100%"
                height="100%"
                src={video.attr.url}
                title={video.attr.title[lang]}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
        );
    };

    const Preview = () => {
        return (
            <>
                {' '}
                {video.image && (
                    <AdaptiveImg
                        prtClass="size-full"
                        imgClass="object-top-left"
                        srcs={video.image.srcSet}
                    />
                )}
                {active && (
                    <>
                        <div class="absolute inset-0 m-auto size-23 translate-y-1/5 xl:size-32">
                            <img
                                aria-hidden="true"
                                class="size-full"
                                src={PlayBtn}
                                alt="play button"
                            />
                        </div>
                        <button
                            type="button"
                            class="absolute inset-0 z-10"
                            onClick={() => setLoaded(true)}
                        />
                    </>
                )}
            </>
        );
    };

    return (
        <li
            class={cn(
                'shadow-video bg-user-background relative isolate h-85 w-[60vw] max-w-240 overflow-clip rounded-xl transition-transform duration-650 ease-in lg:h-80 lg:w-[50vw] xl:h-108 2xl:h-120',
                {
                    'translate-x-1/3': leftNei,
                    '-translate-x-1/3': rightNei,
                    'z-10 scale-130 md:scale-120': active,
                    'pointer-event-none opacity-100':
                        !active && !rightNei && !leftNei,
                },
            )}
        >
            {!active && (
                <div
                    aria-hidden="true"
                    class="pointer-events-none absolute inset-0 z-10 bg-black/40"
                />
            )}
            {loaded && active ? <Iframe /> : <Preview />}
        </li>
    );
};

export default VideoTile;

export const VideoFallback = () => {
    return (
        <li
            class={cn(
                'shadow-video skeleton h-85 w-[60vw] max-w-240 shrink-0 rounded-xl lg:h-80 lg:w-[50vw] xl:h-108 2xl:h-120',
            )}
        />
    );
};
