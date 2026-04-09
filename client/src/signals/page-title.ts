import { effect, signal } from '@preact/signals';

export const pageTitle = signal<string>('Hello');

effect(() => {
    document.title = pageTitle.value;
});

document.title = pageTitle.value;

