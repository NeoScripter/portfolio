import { API_BASE_URL } from '@/lib/const/api';
import type { CategoryType } from '@/lib/types/models/projects';
import { useEffect, useState } from 'preact/hooks';
import { useFetch } from './useFetch';

const useFetchCategories = () => {
    const { fetchData, loading, errors } = useFetch();
    const [categories, setCategories] = useState<CategoryType[]>([]);

    useEffect(() => {
        fetchData({
            url: `${API_BASE_URL}categories`,
            onSuccess: (data) => setCategories(data.data),
        });
    }, []);

    return { categories, loading, errors };
};

export default useFetchCategories;
