import { API_BASE_URL } from '@/lib/const/api';
import { events } from '@/lib/const/events';
import type { CategoryType } from '@/lib/types/models/projects';
import { useEffect, useState } from 'preact/hooks';
import { useFetch } from './useFetch';

const useFetchCategories = () => {
    const { fetchData, loading, errors } = useFetch();
    const [categories, setCategories] = useState<CategoryType[]>([]);

    useEffect(() => {
        const handleFetch = () =>
            fetchData({
                url: `${API_BASE_URL}categories`,
                onSuccess: (data) => setCategories(data.data),
            });

        handleFetch();

        if (typeof window === 'undefined') {
            return;
        }

        window.addEventListener(events.FORM_SUCCESS_EVENT, handleFetch);

        return () =>
            window.removeEventListener(events.FORM_SUCCESS_EVENT, handleFetch);
    }, []);

    return { categories, loading, errors };
};

export default useFetchCategories;
