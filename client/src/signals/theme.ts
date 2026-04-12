import { effect, signal } from '@preact/signals';

const isBrowser = typeof window !== 'undefined';

// Signal for user preference
export const theme = signal<'light' | 'dark' | 'system'>(
    isBrowser
        ? ((localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system')
        : 'system',
);

// Get system theme preference
export const prefersDark = () =>
    isBrowser && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Signal for the actual system theme (reactive)
export const systemTheme = signal<'light' | 'dark'>(
    prefersDark() ? 'dark' : 'light',
);

// Get the effective theme (considering system preference)
export const getTheme = () => {
    const mode = theme.value;
    if (mode === 'system') return systemTheme.value;
    return mode;
};

// Apply theme to document
const applyTheme = (mode: string) => {
    if (!isBrowser) return;
    const isDark = mode === 'dark' || (mode === 'system' && prefersDark());
    document.documentElement.classList.toggle('dark', isDark);
};

if (isBrowser) {
    effect(() => {
        const mode = theme.value;
        localStorage.setItem('theme', mode);
        applyTheme(mode);
    });

    // Listen for system theme changes
    window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
            systemTheme.value = e.matches ? 'dark' : 'light';
            if (theme.value === 'system') applyTheme('system');
        });
}
