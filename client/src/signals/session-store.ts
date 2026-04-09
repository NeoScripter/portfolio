import { signal, effect } from '@preact/signals';

const sessionStore = new Map<string, ReturnType<typeof signal>>();

export function createSessionSignal<T>(key: string, initialValue: T) {
    if (sessionStore.has(key)) {
        return sessionStore.get(key)!;
    }

    let storedValue = initialValue;
    const jsonValue = sessionStorage.getItem(key);
    if (jsonValue !== null) {
        try {
            storedValue = JSON.parse(jsonValue);
        } catch {
            storedValue = initialValue;
        }
    }

    const sig = signal<T>(storedValue);

    effect(() => {
        sessionStorage.setItem(key, JSON.stringify(sig.value));
    });

    sessionStore.set(key, sig);

    return sig;
}

export function clearSessionSignal(key: string) {
    sessionStore.delete(key);
    sessionStorage.removeItem(key);
}

export function clearAllSessionSignals() {
    sessionStore.clear();
    sessionStorage.clear();
}
