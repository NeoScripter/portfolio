import { buildSrcSet, cn } from '@/lib/helpers/utils';
import type { ImageSrcSet } from '@/lib/types/shared';
import { useEffect, useState } from 'preact/hooks';

type AdaptiveImgProps = {
    prtClass?: string;
    imgClass?: string;
    variant?: 'bg' | 'fg';
    srcs: ImageSrcSet | undefined;
    alt?: string;
};

export default function AdaptiveImg({
    prtClass,
    imgClass,
    variant = 'fg',
    srcs,
    alt,
}: AdaptiveImgProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            if (isLoading) {
                setIsLoading(false);
            }
        }, 3000)
    },[])

    if (!srcs) return null;

    const isBg = variant === 'bg';

    return (
        <div
            className={cn(
                isBg
                    ? 'pointer-events-none absolute inset-0 -z-5 overflow-clip select-none'
                    : 'relative overflow-clip',
                prtClass
            )}
            {...(isBg
                ? { 'aria-hidden': 'true' }
                : alt == null && { 'aria-hidden': 'true' })}
        >
            <picture
                className={cn(
                    'block size-full',
                    isBg && 'transition-all duration-500 ease-in-out',
                    isBg && isLoading && 'opacity-0'
                )}
            >
                {srcs.dkAvif && (
                    <source
                        type="image/avif"
                        srcSet={buildSrcSet([
                            [srcs.dkAvif, '1x'],
                            [srcs.dkAvif2x, '2x'],
                            [srcs.dkAvif3x, '3x'],
                        ])}
                        media="(min-width: 56rem)"
                    />
                )}
                <source
                    type="image/webp"
                    srcSet={buildSrcSet([
                        [srcs.dk, '1x'],
                        [srcs.dk2x, '2x'],
                        [srcs.dk3x, '3x'],
                    ])}
                    media="(min-width: 56rem)"
                />
                {srcs.tbAvif && (
                    <source
                        type="image/avif"
                        srcSet={buildSrcSet([
                            [srcs.tbAvif, '1x'],
                            [srcs.tbAvif2x, '2x'],
                            [srcs.tbAvif3x, '3x'],
                        ])}
                        media="(min-width: 31rem)"
                    />
                )}
                <source
                    type="image/webp"
                    srcSet={buildSrcSet([
                        [srcs.tb, '1x'],
                        [srcs.tb2x, '2x'],
                        [srcs.tb3x, '3x'],
                    ])}
                    media="(min-width: 31rem)"
                />
                {srcs.mbAvif && (
                    <source
                        type="image/avif"
                        srcSet={buildSrcSet([
                            [srcs.mbAvif, '1x'],
                            [srcs.mbAvif2x, '2x'],
                            [srcs.mbAvif3x, '3x'],
                        ])}
                    />
                )}
                <img
                    onLoad={() => setIsLoading(false)}
                    srcSet={buildSrcSet([
                        [srcs.mb, '1x'],
                        [srcs.mb2x, '2x'],
                        [srcs.mb3x, '3x'],
                    ])}
                    alt={isBg ? '' : (alt ?? '')}
                    loading="lazy"
                    className={cn(
                        'block size-full object-cover',
                        isBg
                            ? 'object-bottom-right'
                            : 'object-center transition-all duration-500 ease-in-out',
                        imgClass,
                        !isBg && isLoading && 'opacity-0'
                    )}
                    aria-hidden={!isBg ? isLoading : undefined}
                />
            </picture>

            {isLoading && (
                <div
                    role="status"
                    aria-label="Фото загружается"
                    className={cn(
                        'absolute inset-0 flex items-center justify-center',
                        isBg ? '-z-5 h-full max-h-screen w-full' : 'z-10'
                    )}
                >
                    <div
                        aria-hidden="true"
                        className={cn(
                            'absolute inset-0 size-full animate-pulse bg-gray-200/50',
                            isBg ? undefined : 'z-10'
                        )}
                    />
                    <img
                        aria-hidden="true"
                        src={srcs.mbTiny}
                        alt=""
                        className={cn(
                            'block size-full object-cover',
                            isBg ? 'object-bottom-right' : 'object-center'
                        )}
                    />
                </div>
            )}
        </div>
    );
}
