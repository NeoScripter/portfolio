import AppTitle from '@/components/layout/AppTitle';
import StateResolver from '@/components/shared/StateResolver';
import useFetchRecords from '@/hooks/useFetchRecords';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import { API_BASE_URL } from '@/lib/const/api';
import type { TechStackType } from '@/lib/types/models/tech-stack';
import { type FC } from 'preact/compat';
import TechStackUpsert from './partials/TechStackUpsert';

const Edit: FC<{ id: number }> = ({ id }) => {
    const {
        data: stack,
        loading,
        errors,
    } = useFetchRecords<TechStackType>({
        url: `${API_BASE_URL}tech-stacks/${id}`,
    });

    return (
        <AdminLayout title={{ en: 'Edit Stack', ru: 'Редактировать навык' }}>
            <AppTitle titleEn="Edit Stack" titleRu="Редактировать навык" />
            <AdminShellLayout>
                <StateResolver errors={errors} loading={loading}>
                    {stack && <TechStackUpsert stack={stack} />}
                </StateResolver>
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default Edit;
