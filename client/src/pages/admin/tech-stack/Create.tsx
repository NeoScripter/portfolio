import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import TechStackUpsert from './partials/TechStackUpsert';

const Create = () => {
    return (
        <AdminLayout title={{ en: 'Create Stack', ru: 'Добавить навык' }}>
            <AdminShellLayout>
                <TechStackUpsert />
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default Create;
