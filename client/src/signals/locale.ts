import { effect, signal } from '@preact/signals';

const isBrowser = typeof window !== 'undefined';

export type LocaleType = 'en' | 'ru';

export const locale = signal<LocaleType>(
    isBrowser
        ? ((localStorage.getItem('locale') as 'en' | 'ru') || 'ru')
        : 'ru',
);

export const prefersRussian = () =>
    isBrowser && (navigator.language.startsWith('ru'));

const applyLocale = (lang: 'en' | 'ru') => {
    if (!isBrowser) return;
    document.documentElement.lang = lang;
    // window.scrollTo(0, 0);
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
