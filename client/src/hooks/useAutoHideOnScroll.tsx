import { useEffect, useRef, useState } from 'preact/hooks';

export default function useAutoHideOnScroll() {
    const [hide, setHide] = useState(false);
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
            } else if (currentScrollTop < lastScrollTopRef.current - 85) {
                // User is scrolling up
                setHide(false);
            }

            lastScrollTopRef.current = currentScrollTop;
        };

        window.addEventListener('scroll', handleScrollDown);

        return () => window.removeEventListener('scroll', handleScrollDown);
    }, []);

    return hide;
}
