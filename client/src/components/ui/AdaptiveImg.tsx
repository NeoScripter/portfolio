import { buildSrcSet, cn } from '@/lib/helpers/utils';
import type { ImageSrcSet } from '@/lib/types/shared';
import { useCallback, useState } from 'preact/hooks';

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

    const imgRef = useCallback((img: HTMLImageElement | null) => {
        if (img?.complete) setIsLoading(false);
    }, []);

    if (!srcs) return null;

    const isBg = variant === 'bg';

    return (
        <div
            style={{
                '--dk-src': `url(${srcs.dkTiny})`,
                '--tb-src': `url(${srcs.tbTiny})`,
                '--mb-src': `url(${srcs.mbTiny})`,
            }}
            className={cn(
                'adaptive-img-blur overflow-clip bg-cover bg-center bg-no-repeat',
                isBg
                    ? 'pointer-events-none absolute inset-0 -z-5 select-none'
                    : 'relative',
                prtClass,
            )}
            {...(isBg
                ? { 'aria-hidden': 'true' }
                : alt == null && { 'aria-hidden': 'true' })}
        >
            <div
                aria-hidden="true"
                className={cn(
                    !isLoading && 'hidden',
                    'animate-loading absolute inset-0 size-full bg-white/75',
                )}
            />

            <picture>
                {srcs.dkAvif && (
                    <source
                        type="image/avif"
                        srcSet={buildSrcSet([
                            [srcs.dkAvif, '1x'],
                            [srcs.dkAvif2x, '2x'],
                            [srcs.dkAvif3x, '3x'],
                        ])}
                        media="(min-width: 896px)"
                    />
                )}
                {srcs.dk && (
                    <source
                        type="image/webp"
                        srcSet={buildSrcSet([
                            [srcs.dk, '1x'],
                            [srcs.dk2x, '2x'],
                            [srcs.dk3x, '3x'],
                        ])}
                        media="(min-width: 896px)"
                    />
                )}
                {srcs.tbAvif && (
                    <source
                        type="image/avif"
                        srcSet={buildSrcSet([
                            [srcs.tbAvif, '1x'],
                            [srcs.tbAvif2x, '2x'],
                            [srcs.tbAvif3x, '3x'],
                        ])}
                        media="(min-width: 496px)"
                    />
                )}
                {srcs.tb && (
                    <source
                        type="image/webp"
                        srcSet={buildSrcSet([
                            [srcs.tb, '1x'],
                            [srcs.tb2x, '2x'],
                            [srcs.tb3x, '3x'],
                        ])}
                        media="(min-width: 496px)"
                    />
                )}
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
                    ref={imgRef}
                    onLoad={() => setIsLoading(false)}
                    srcSet={buildSrcSet([
                        [srcs.mb, '1x'],
                        [srcs.mb2x, '2x'],
                        [srcs.mb3x, '3x'],
                    ])}
                    loading="lazy"
                    alt={isBg ? '' : (alt ?? '')}
                    className={cn(
                        'block size-full object-cover object-center transition-all duration-500 ease-in-out',
                        imgClass,
                        isLoading && 'opacity-0',
                    )}
                    aria-hidden={isLoading}
                />
            </picture>
        </div>
    );
}
