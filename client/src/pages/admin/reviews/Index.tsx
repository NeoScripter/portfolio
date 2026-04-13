import AdminShellNav from '@/components/layout/AdminShellNav';
import { DeleteModalProvider } from '@/context/DeleteModelContext';
import { useFetch } from '@/hooks/useFetch';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import { range } from '@/lib/helpers/utils';
import type { ReviewType } from '@/lib/types/models/reviews';
import { useEffect, useState } from 'preact/hooks';
import ReviewCard, { ReviewFallback } from './partials/ReviewCard';
import ReviewDelete from './partials/ReviewDelete';
import ModalLayout from '@/layouts/ModalLayout';

const Reviews = () => {
    const { fetchData, loading, errors } = useFetch();
    const [reviews, setReviews] = useState<ReviewType[] | null>(null);

    useEffect(() => {
        const fetchReviews = () => {
            fetchData({
                url: '/api/reviews.json',
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

    return (
        <DeleteModalProvider>
            <AdminLayout title={{en:"Reviews", ru: "Отзывы"}}>
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
                    <ModalLayout className="max-w-9/10 px-10 py-14 sm:max-w-100 lg:max-w-160">
                        <ReviewDelete />
                    </ModalLayout>
                </AdminShellLayout>
            </AdminLayout>
        </DeleteModalProvider>
    );
};

export default Reviews;
