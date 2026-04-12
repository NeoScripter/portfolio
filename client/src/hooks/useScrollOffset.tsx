import { useEffect, useState } from 'preact/compat';

export default function useScrollOffset(offset = 600) {
    const isBrowser = typeof window !== 'undefined';

    const [isBelow, setIsBelow] = useState(
        isBrowser ? window.scrollY > offset : false,
    );

    useEffect(() => {
        if (!isBrowser) {
            return;
        }
        const handleScroll = () => {
            setIsBelow(window.scrollY > offset);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return { isBelow };
}
