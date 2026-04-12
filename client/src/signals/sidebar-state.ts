import { MD } from '@/lib/const/breakpoints';
import { computed, effect, signal } from '@preact/signals';

const isBrowser = typeof window !== 'undefined';

export const sidebarState = signal<'hidden' | 'mini' | 'wide'>('wide');
export const isHidden = computed(() => sidebarState.value === 'hidden');
export const isMini = computed(() => sidebarState.value === 'mini');
export const isWide = computed(() => sidebarState.value === 'wide');

export const hide = () => {
    if (!isBrowser || window.innerWidth >= MD) return;
    sidebarState.value = 'hidden';
};
export const minify = () => {
    if (!isBrowser || window.innerWidth < MD) return;
    sidebarState.value = 'mini';
};
export const expand = () => {
    sidebarState.value = 'wide';
};

if (isBrowser) {
    const mq = window.matchMedia(`(min-width: ${MD / 16}rem)`);

    const updateSidebar = (e: MediaQueryListEvent | MediaQueryList) => {
        e.matches ? expand() : hide();
    };

    effect(() => {
        document.documentElement.style.overflowY = isHidden.value
            ? 'auto'
            : 'clip';
        return () => {
            document.documentElement.style.overflowY = 'auto';
        };
    });

    effect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && window.innerWidth < MD) hide();
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    });

    updateSidebar(mq);
    mq.addEventListener('change', updateSidebar);
}
