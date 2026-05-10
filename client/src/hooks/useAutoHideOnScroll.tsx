import { events } from '@/lib/const/events';
import { useEffect, useRef, useState } from 'preact/hooks';

export default function useAutoHideOnScroll() {
    const [hide, setHide] = useState(false);
    const timeoutRef = useRef<number | null>(null);
    const lastScrollTopRef = useRef(0);

    const isBrowser = typeof window !== 'undefined';

    useEffect(() => {
        if (!isBrowser) {
            return;
        }
        const handleScrollDown = () => {
            const currentScrollTop =
                window.scrollY || document.documentElement.scrollTop;

            if (currentScrollTop < 200) {
                setHide(false);
                return;
            }
            if (currentScrollTop > lastScrollTopRef.current + 15) {
                // User is scrolling down
                setHide(true);
            } else if (currentScrollTop < lastScrollTopRef.current - 50) {
                // User is scrolling up
                setHide(false);
            }

            lastScrollTopRef.current = currentScrollTop;
        };

        const handleLocaleToggle = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => setHide(false), 100);
        };

        window.addEventListener('scroll', handleScrollDown);
        window.addEventListener(events.LOCALE_TOGGLE, handleLocaleToggle);

        return () => {
            window.removeEventListener('scroll', handleScrollDown);
            window.removeEventListener(
                events.LOCALE_TOGGLE,
                handleLocaleToggle,
            );
        };
    }, []);

    return hide;
}
