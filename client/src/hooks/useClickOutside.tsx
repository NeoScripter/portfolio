import { useEffect } from 'preact/hooks';

export const useClickOutside = (selectors: string[], cb = () => {}) => {
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const el = e.target as HTMLElement | null;
            if (!el) return;

            const inside = selectors.some((sel) => el.closest(sel));
            if (!inside) {
                cb();
            }
        };

        window.addEventListener('click', onClick);
        return () => window.removeEventListener('click', onClick);
    }, [selectors]);
};

// import { useEffect, useState } from 'preact/hooks';

// export const useClickOutside = (
//     selectors: string[],
//     initialState = false,
//     cb = () => {},
// ) => {
//     const [show, setShow] = useState(initialState);

//     useEffect(() => {
//         const onClick = (e: MouseEvent) => {
//             const el = e.target as HTMLElement | null;
//             if (!el) return;

//             const inside = selectors.some((sel) => el.closest(sel));
//             if (!inside) {
//                 setShow((prev) => {
//                     if (prev === true) {
//                         cb();
//                     }

//                     return false;
//                 });
//             }
//         };

//         window.addEventListener('click', onClick);
//         return () => window.removeEventListener('click', onClick);
//     }, [selectors]);

//     return { show, setShow };
// };
