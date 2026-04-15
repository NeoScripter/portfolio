import { useEffect, useState } from 'preact/hooks';

const QUERY = '(prefers-reduced-motion: reduce)';

type GetInitialState = () => boolean;

function usePrefersReducedMotion(): boolean {
    const getInitialState: GetInitialState = () => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            return !window.matchMedia(QUERY).matches;
        }
        return false;
    };

    const [prefersReducedMotion, setPrefersReducedMotion] =
        useState<boolean>(getInitialState);

    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) {
            return;
        }

        const mediaQueryList: MediaQueryList = window.matchMedia(QUERY);

        const listener = (event: MediaQueryListEvent): void => {
            setPrefersReducedMotion(!event.matches);
        };

        if (mediaQueryList.addEventListener) {
            mediaQueryList.addEventListener('change', listener);
        } else {
            (mediaQueryList as any).addListener(listener);
        }

        return () => {
            if (mediaQueryList.removeEventListener) {
                mediaQueryList.removeEventListener('change', listener);
            } else {
                (mediaQueryList as any).removeListener(listener);
            }
        };
    }, []);

    return prefersReducedMotion;
}

export default usePrefersReducedMotion;
