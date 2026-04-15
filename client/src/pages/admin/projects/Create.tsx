import AppTitle from '@/components/layout/AppTitle';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import ProjectUpsert from './partials/ProjectUpsert';

const Create = () => {
    return (
        <AdminLayout title={{ en: 'Create project', ru: 'Добавить проект' }}>
            <AppTitle titleEn="Create Project" titleRu="Добавить проект" />
            <AdminShellLayout>
                <ProjectUpsert />
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default Create;
