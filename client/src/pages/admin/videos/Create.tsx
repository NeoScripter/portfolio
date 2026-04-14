import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import VideoUpsert from './partials/VideoUpsert';

const CreateVideo = () => {
    return (
        <AdminLayout title={{ en: 'Create Video', ru: 'Добавить видео' }}>
            <AdminShellLayout>
                <VideoUpsert />
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default CreateVideo;
