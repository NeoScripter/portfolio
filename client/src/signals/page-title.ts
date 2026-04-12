import { effect, signal } from '@preact/signals';

const isBrowser = typeof window !== 'undefined';
export const pageTitle = signal<string>('Hello');

if (isBrowser) {
    effect(() => {
        document.title = pageTitle.value;
    });

    document.title = pageTitle.value;
}
