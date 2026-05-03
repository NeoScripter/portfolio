import { events } from '@/lib/const/events';
import { useEffect, useState } from 'preact/hooks';
import { useFetch } from './useFetch';
import type { ServerError } from './useForm';

type FetchRecordParams = {
    url: string;
    shouldCache?: boolean;
};

type FetchRecordReturn<T> = {
    data: T | null;
    loading: boolean;
    errors: ServerError | null;
};

export default function useFetchRecords<T>({
    url,
    shouldCache = false
}: FetchRecordParams): FetchRecordReturn<T> {
    const { fetchData, loading, errors } = useFetch();
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        const fetchRecords = () =>
            fetchData({
                url: url,
                onSuccess: (res) => {
                    setData(res.data as T);
                },
            });

        fetchRecords();

        window.addEventListener(events.FORM_SUCCESS_EVENT, fetchRecords);

        return () => {
            window.removeEventListener(events.FORM_SUCCESS_EVENT, fetchRecords);
        };
    }, []);

    return { data, loading, errors };
}
