import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import TechStackUpsert from './partials/TechStackUpsert';
import AppTitle from '@/components/layout/AppTitle';

const Create = () => {
    return (
        <AdminLayout title={{ en: 'Create Stack', ru: 'Добавить навык' }}>
            <AppTitle titleEn="Create Stack" titleRu="Добавить навык" />
            <AdminShellLayout>
                <TechStackUpsert />
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default Create;
