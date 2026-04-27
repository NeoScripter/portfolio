import AppTitle from '@/components/layout/AppTitle';
import ApiError from '@/components/ui/ApiError';
import { useFetch } from '@/hooks/useFetch';
import type { ServerError } from '@/hooks/useForm';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import { API_BASE_URL } from '@/lib/const/api';
import { hasErrorDetails } from '@/lib/helpers/utils';
import type { FaqType } from '@/lib/types/models/faqs';
import type { FC } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import FaqUpsert from './partials/FaqUpsert';
import StateResolver from '@/components/shared/StateResolver';

const EditFaq: FC<{ id: number }> = ({ id }) => {
    const { fetchData, loading, errors } = useFetch();
    const [faq, setFaq] = useState<FaqType | null>(null);

    useEffect(() => {
        fetchData({
            url: `${API_BASE_URL}faqs/${id}`,
            onSuccess: (data) => {
                setFaq(data.data);
            },
        });
    }, []);

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
