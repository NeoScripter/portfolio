import { effect, signal } from '@preact/signals';

const isBrowser = typeof window !== 'undefined';

export const locale = signal<'en' | 'ru'>(
    isBrowser
        ? ((localStorage.getItem('locale') as 'en' | 'ru') || 'ru')
        : 'ru',
);

export const prefersRussian = () =>
    isBrowser && (navigator.language.startsWith('ru'));

const applyLocale = (lang: 'en' | 'ru') => {
    if (!isBrowser) return;
    document.documentElement.lang = lang;
};

if (isBrowser) {
    effect(() => {
        const lang = locale.value;
        localStorage.setItem('locale', lang);
        applyLocale(lang);
    });

    window.addEventListener('languagechange', () => {
        if (!localStorage.getItem('locale')) {
            locale.value = prefersRussian() ? 'ru' : 'en';
        }
    });
}
