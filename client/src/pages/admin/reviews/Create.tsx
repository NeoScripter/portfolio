import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import ReviewUpsert from './partials/ReviewUpsert';

const CreateReview = () => {
    return (
        <AdminLayout title={{ en: 'Create Review', ru: 'Создать отзыв' }}>
            <AdminShellLayout>
                <ReviewUpsert />
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default CreateReview;
