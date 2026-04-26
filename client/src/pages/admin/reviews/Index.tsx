import AdminShellNav from '@/components/layout/AdminShellNav';
import AppTitle from '@/components/layout/AppTitle';
import { DeleteModalProvider } from '@/context/DeleteModelContext';
import { useFetch } from '@/hooks/useFetch';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import DeleteModalLayout from '@/layouts/DeleteModalLayout';
import { range } from '@/lib/helpers/utils';
import type { ReviewType } from '@/lib/types/models/reviews';
import { useEffect, useState } from 'preact/hooks';
import ReviewCard, { ReviewFallback } from './partials/ReviewCard';
import ReviewDelete from './partials/ReviewDelete';
import { API_BASE_URL } from '@/lib/const/api';

const Reviews = () => {
    const { fetchData, loading, errors } = useFetch();
    const [reviews, setReviews] = useState<ReviewType[] | null>(null);

    useEffect(() => {
        const fetchReviews = () => {
            fetchData({
                url: `${API_BASE_URL}reviews`,
                onSuccess: (data) => {
                    setReviews(data.data);
                },
            });
        };

        fetchReviews();

        document.addEventListener('itemDeleted', fetchReviews);

        return () => document.removeEventListener('itemDeleted', fetchReviews);
    }, []);

    if (errors != null) {
        console.error(errors);
    }

    console.log(reviews)

    return (
        <DeleteModalProvider>
            <AdminLayout title={{ en: 'Reviews', ru: 'Отзывы' }}>
                <AppTitle titleEn="Reviews" titleRu="Отзывы" />
                <AdminShellLayout>
                    <AdminShellNav href={'/admin/reviews/create'} />
                    {loading ? (
                        <ul className="space-y-12">
                            {range(0, 8).map((idx) => (
                                <ReviewFallback key={idx} />
                            ))}
                        </ul>
                    ) : (
                        <ul className="space-y-12">
                            {reviews &&
                                reviews.map((review) => (
                                    <ReviewCard
                                        key={review.id}
                                        review={review}
                                    />
                                ))}
                        </ul>
                    )}
                    <DeleteModalLayout>
                        <ReviewDelete />
                    </DeleteModalLayout>
                </AdminShellLayout>
            </AdminLayout>
        </DeleteModalProvider>
    );
};

export default Reviews;
