import { useEffect } from 'preact/hooks';

export const useEscapeKey = (onEscape: () => void) => {
    const isBrowser = typeof window !== 'undefined';

    useEffect(() => {
        if (!isBrowser) {
            return;
        }
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onEscape();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onEscape]);
};
