import AppTitle from '@/components/layout/AppTitle';
import StateResolver from '@/components/shared/StateResolver';
import useFetchRecords from '@/hooks/useFetchRecords';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import { API_BASE_URL } from '@/lib/const/api';
import type { FaqType } from '@/lib/types/models/faqs';
import type { FC } from 'preact/compat';
import FaqUpsert from './partials/FaqUpsert';

const EditFaq: FC<{ id: number }> = ({ id }) => {
    const {
        data: faq,
        loading,
        errors,
    } = useFetchRecords<FaqType>({
        url: `${API_BASE_URL}faqs/${id}`,
    });

    return (
        <AdminLayout title={{ en: 'Edit Faq', ru: 'Редактировать FAQ' }}>
            <AppTitle titleEn="Edit Faq" titleRu="Редактировать FAQ" />
            <AdminShellLayout>
                <StateResolver errors={errors} loading={loading}>
                    {faq && <FaqUpsert faq={faq} />}
                </StateResolver>
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default EditFaq;
