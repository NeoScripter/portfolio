import AppTitle from '@/components/layout/AppTitle';
import StateResolver from '@/components/shared/StateResolver';
import useFetchRecords from '@/hooks/useFetchRecords';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import { API_BASE_URL } from '@/lib/const/api';
import type { ReviewType } from '@/lib/types/models/reviews';
import type { FC } from 'preact/compat';
import ReviewUpsert from './partials/ReviewUpsert';

const Edit: FC<{ id: number }> = ({ id }) => {
    const {
        data: review,
        loading,
        errors,
    } = useFetchRecords<ReviewType>({
        url: `${API_BASE_URL}reviews/${id}`,
    });

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
