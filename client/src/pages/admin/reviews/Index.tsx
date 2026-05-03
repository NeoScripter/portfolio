import AdminShellNav from '@/components/layout/AdminShellNav';
import AppTitle from '@/components/layout/AppTitle';
import { DeleteModalProvider } from '@/context/DeleteModelContext';
import useFetchRecords from '@/hooks/useFetchRecords';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import DeleteModalLayout from '@/layouts/DeleteModalLayout';
import { API_BASE_URL } from '@/lib/const/api';
import { hasErrorDetails, range } from '@/lib/helpers/utils';
import type { ReviewType } from '@/lib/types/models/reviews';
import ReviewCard, { ReviewFallback } from './partials/ReviewCard';
import ReviewDelete from './partials/ReviewDelete';

const Reviews = () => {
    const {
        data: reviews,
        loading,
        errors,
    } = useFetchRecords<ReviewType[]>({
        url: `${API_BASE_URL}reviews`,
    });

    if (hasErrorDetails(errors)) {
        console.error(errors);
    }

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
                            {reviews && reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <ReviewCard
                                        key={review.id}
                                        review={review}
                                    />
                                ))
                            ) : (
                                <p>You haven't added any reviews yet</p>
                            )}
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
