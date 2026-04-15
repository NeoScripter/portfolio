import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import VideoUpsert from './partials/VideoUpsert';
import AppTitle from '@/components/layout/AppTitle';

const CreateVideo = () => {
    return (
        <AdminLayout title={{ en: 'Create Video', ru: 'Добавить видео' }}>
            <AppTitle titleEn="Create Video" titleRu="Добавить видео" />
            <AdminShellLayout>
                <VideoUpsert />
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default CreateVideo;
