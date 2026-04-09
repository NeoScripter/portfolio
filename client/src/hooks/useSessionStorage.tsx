import { useEffect, useState } from 'preact/hooks';

export function useSessionStorage(
    key: string,
    initialValue: any,
): [any, React.Dispatch<React.SetStateAction<any>>] {
    const [value, setValue] = useState<any>(() => {
        const jsonValue = sessionStorage.getItem(key);
        if (jsonValue !== null) {
            try {
                return JSON.parse(jsonValue);
            } catch {
                return initialValue;
            }
        }
        return initialValue;
    });

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}
