import { events } from '@/lib/const/events';
import { signal } from '@preact/signals';
import { useEffect, useState } from 'preact/hooks';
import { useFetch } from './useFetch';
import type { ServerError } from './useForm';

const CACHE_TTL_SEC = 60;
const recordsCache = signal<Map<string, CacheEntry>>(new Map());

type CacheEntry = {
    data: unknown;
    ttl: number;
};

type FetchRecordParams = {
    url: string;
    shouldCache?: boolean;
};

type FetchRecordReturn<T> = {
    data: T | null;
    loading: boolean;
    errors: ServerError | null;
};

function getCachedEntry<T>(url: string): T | null {
    const cachedEntry = recordsCache.value.get(url);
    if (!cachedEntry || cachedEntry.ttl < new Date().getTime()) return null;
    return cachedEntry.data as T;
}

export default function useFetchRecords<T>({
    url,
    shouldCache = false,
}: FetchRecordParams): FetchRecordReturn<T> {
    const { fetchData, loading, errors } = useFetch();
    const [data, setData] = useState<T | null>(() =>
        shouldCache ? getCachedEntry<T>(url) : null,
    );

    useEffect(() => {
        function loadRecords(invalidate: boolean) {
            if (shouldCache && invalidate) {
                const prunedCache = new Map(recordsCache.value);
                prunedCache.delete(url);
                recordsCache.value = prunedCache;
            }

            if (shouldCache) {
                const cached = getCachedEntry<T>(url);
                if (cached) {
                    setData(cached);
                    return;
                }
            }

            fetchData({
                url,
                onSuccess: (res) => {
                    const result = res.data as T;
                    if (shouldCache) {
                        recordsCache.value = new Map(recordsCache.value).set(
                            url,
                            {
                                data: result,
                                ttl:
                                    new Date().getTime() + CACHE_TTL_SEC * 1000,
                            },
                        );
                    }
                    setData(result);
                },
            });
        }

        loadRecords(false);

        const onFormSuccess = () => loadRecords(true);

        window.addEventListener(events.FORM_SUCCESS_EVENT, onFormSuccess);
        return () => {
            window.removeEventListener(
                events.FORM_SUCCESS_EVENT,
                onFormSuccess,
            );
        };
    }, [url, shouldCache]);

    return { data, loading, errors };
}
