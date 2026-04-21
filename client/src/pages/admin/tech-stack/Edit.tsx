import { useFetch } from '@/hooks/useFetch';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import type { TechStackType } from '@/lib/types/models/tech-stack';
import { useEffect, useState, type FC } from 'preact/compat';
import TechStackUpsert from './partials/TechStackUpsert';
import AppTitle from '@/components/layout/AppTitle';
import { PREFIX } from '@/lib/const/api';

const Edit: FC<{ id: number }> = ({ id }) => {
    const { fetchData, loading, errors } = useFetch();
    const [stack, setStack] = useState<TechStackType | null>(null);

    useEffect(() => {
        fetchData({
            url: `${PREFIX}tech-stacks/${id}`,
            onSuccess: (data) => {
                setStack(data.data);
            },
        });
    }, []);

    if (errors != null) {
        console.error(errors);
    }

    return (
        <AdminLayout title={{ en: 'Edit Stack', ru: 'Редактировать навык' }}>
            <AppTitle titleEn="Edit Stack" titleRu="Редактировать навык" />
            <AdminShellLayout>
                {errors != null ? (
                    <p>{errors.errors?.message}</p>
                ) : loading || stack == null ? (
                    'Loading...'
                ) : (
                    <TechStackUpsert stack={stack} />
                )}
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default Edit;
