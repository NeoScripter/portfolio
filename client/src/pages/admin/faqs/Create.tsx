import AppTitle from '@/components/layout/AppTitle';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import FaqUpsert from './partials/FaqUpsert';

const CreateFaq = () => {
    return (
        <AdminLayout title={{ en: 'Create Faq', ru: 'Создать FAQ' }}>
            <AppTitle titleEn="Create Faq" titleRu="Создать FAQ" />
            <AdminShellLayout>
                <FaqUpsert />
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default CreateFaq;
