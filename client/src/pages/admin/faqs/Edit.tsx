import AppTitle from '@/components/layout/AppTitle';
import { useFetch } from '@/hooks/useFetch';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import type { FaqType } from '@/lib/types/models/faqs';
import type { FC } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import FaqUpsert from './partials/FaqUpsert';

const EditFaq: FC<{ id: number }> = ({ id }) => {
    const { fetchData, loading, errors } = useFetch();
    const [faq, setFaq] = useState<FaqType | null>(null);

    useEffect(() => {
        fetchData({
            url: `/api/faqs/${id}`,
            onSuccess: (data) => {
                setFaq(data.data);
            },
        });
    }, []);

    if (errors != null) {
        console.error(errors);
    }

    return (
        <AdminLayout title={{ en: 'Edit Faq', ru: 'Редактировать FAQ' }}>
            <AppTitle titleEn="Edit Faq" titleRu="Редактировать FAQ" />
            <AdminShellLayout>
                {errors != null ? (
                    <p>{errors?.errors?.message}</p>
                ) : loading || faq == null ? (
                    'Loading...'
                ) : (
                    <FaqUpsert faq={faq} />
                )}
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default EditFaq;
