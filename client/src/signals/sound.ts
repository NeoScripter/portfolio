import { effect, signal } from '@preact/signals';

const isBrowser = typeof window !== 'undefined';

export const prefersSound = signal<boolean>(
    isBrowser
        ? localStorage.getItem('soundPreference') !== 'false'
        : true,
);

if (isBrowser) {
    effect(() => {
        localStorage.setItem('soundPreference', String(prefersSound.value));
    });
}
