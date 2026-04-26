import { API_BASE_URL } from '@/lib/const/api';
import { events } from '@/lib/const/events';
import type { TechnologyType } from '@/lib/types/models/projects';
import { useEffect, useState } from 'preact/hooks';
import { useFetch } from './useFetch';

const useFetchStacks = () => {
    const { fetchData, loading, errors } = useFetch();
    const [stacks, setStacks] = useState<TechnologyType[]>([]);

    useEffect(() => {
        const handleFetch = () =>
            fetchData({
                url: `${API_BASE_URL}technologies`,
                onSuccess: (data) => setStacks(data.data),
            });

        handleFetch();

        if (typeof window === 'undefined') {
            return;
        }

        window.addEventListener(events.FORM_SUCCESS_EVENT, handleFetch);

        return () =>
            window.removeEventListener(events.FORM_SUCCESS_EVENT, handleFetch);
    }, []);

    return { stacks, loading, errors };
};

export default useFetchStacks;
