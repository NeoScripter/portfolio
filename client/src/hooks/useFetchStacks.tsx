import type { TechnologyType } from '@/lib/types/models/projects';
import { useEffect, useState } from 'preact/hooks';
import { useFetch } from './useFetch';

const useFetchStacks = () => {
    const { fetchData, loading, errors } = useFetch();
    const [stacks, setStacks] = useState<TechnologyType[]>([]);

    useEffect(() => {
        fetchData({
            url: '/api/technologies',
            onSuccess: (data) => setStacks(data.data),
        });
    }, []);

    return { stacks, loading, errors };
};

export default useFetchStacks;
