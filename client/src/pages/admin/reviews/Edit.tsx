import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import type { FC } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import ReviewUpsert from './partials/ReviewUpsert';
import { useFetch } from '@/hooks/useFetch';
import type { ReviewType } from '@/lib/types/models/reviews';

const Edit: FC<{ id: number }> = ({ id }) => {
    const { fetchData, loading, errors } = useFetch();
    const [review, setReview] = useState<ReviewType | null>(null);

    useEffect(() => {
        fetchData({
            url: `/api/reviews/${id}`,
            onSuccess: (data) => {
                setReview(data.data);
            },
        });
    }, []);

    if (errors != null) {
        console.error(errors);
    }

    return (
        <AdminLayout title={{en: "Edit Review", ru: "Редактировать отзыв"}}>
            <AdminShellLayout>
                {errors != null ? (
                    <p>{errors.errors?.message}</p>
                ) : loading || review == null ? (
                    'Loading...'
                ) : (
                    <ReviewUpsert review={review} />
                )}
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default Edit;
