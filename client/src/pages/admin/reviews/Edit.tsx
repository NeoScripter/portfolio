import AppTitle from '@/components/layout/AppTitle';
import { useFetch } from '@/hooks/useFetch';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import { API_BASE_URL } from '@/lib/const/api';
import { hasErrorDetails } from '@/lib/helpers/utils';
import type { ReviewType } from '@/lib/types/models/reviews';
import type { FC } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import ReviewUpsert from './partials/ReviewUpsert';
import StateResolver from '@/components/shared/StateResolver';

const Edit: FC<{ id: number }> = ({ id }) => {
    const { fetchData, loading, errors } = useFetch();
    const [review, setReview] = useState<ReviewType | null>(null);

    useEffect(() => {
        fetchData({
            url: `${API_BASE_URL}reviews/${id}`,
            onSuccess: (data) => {
                setReview(data.data);
            },
        });
    }, []);

    return (
        <AdminLayout title={{ en: 'Edit Review', ru: 'Редактировать отзыв' }}>
            <AppTitle titleEn="Edit Review" titleRu="Редактировать отзыв" />
            <AdminShellLayout>
                <StateResolver errors={errors} loading={loading}>
                    {review && <ReviewUpsert review={review} />}
                </StateResolver>
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default Edit;
