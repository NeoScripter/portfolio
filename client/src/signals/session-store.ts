import { effect, signal } from '@preact/signals';

const isBrowser = typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';

const sessionStore = new Map<string, ReturnType<typeof signal>>();

export function createSessionSignal<T>(key: string, initialValue: T) {
    if (sessionStore.has(key)) {
        return sessionStore.get(key)! as ReturnType<typeof signal<T>>;
    }

    let storedValue = initialValue;

    if (isBrowser) {
        const jsonValue = sessionStorage.getItem(key);
        if (jsonValue !== null) {
            try {
                storedValue = JSON.parse(jsonValue);
            } catch {
                storedValue = initialValue;
            }
        }
    }

    const sig = signal<T>(storedValue);

    if (isBrowser) {
        effect(() => {
            sessionStorage.setItem(key, JSON.stringify(sig.value));
        });
    }

    sessionStore.set(key, sig);
    return sig;
}

export function clearSessionSignal(key: string) {
    sessionStore.delete(key);
    if (isBrowser) sessionStorage.removeItem(key);
}

export function clearAllSessionSignals() {
    sessionStore.clear();
    if (isBrowser) sessionStorage.clear();
}
