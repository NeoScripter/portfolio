import { isServerError } from '@/hooks/useForm';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function capitalize(sentence: string) {
    return sentence
        .split(' ')
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1).toLocaleLowerCase(),
        )
        .join(' ');
}

export function buildSrcSet(sources: Array<[string | undefined, string]>) {
    return sources
        .filter(([src]) => !!src)
        .map(([src, dpr]) => `${src} ${dpr}`)
        .join(', ');
}

export function range(start: number, end: number) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default function throttle<T extends (...args: any[]) => any>(
    fn: T,
    delay: number = 400,
): (...args: Parameters<T>) => void {
    let lastCall = 0;
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            fn.apply(this, args);
        }
    };
}

export function shortenDescription(desc: string, limit = 15) {
    return (
        desc.split(' ').slice(0, limit).join(' ') +
        (desc.split(' ').length > limit ? '...' : '')
    );
}

export function hasErrorDetails(error: unknown): boolean {
    if (!isServerError(error)) return false;

    const hasValidMessage = error.message?.trim() !== '';
    const hasErrorsObject = error.errors !== null;

    return hasValidMessage && hasErrorsObject;
}

export function getUpdatedUrl(newParams: Record<string, string>[]): string {
    if (typeof window === 'undefined') return '';

    try {
        const url = new URL(window.location.href);
        for (const record of newParams) {
            url.searchParams.set(
                record.name,
                record.val.toString(),
            );
        }
        return url.toString();
    } catch (err) {
        console.error(err);
        return '';
    }
}
