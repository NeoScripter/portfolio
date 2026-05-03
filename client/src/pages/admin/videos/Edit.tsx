import AppTitle from '@/components/layout/AppTitle';
import StateResolver from '@/components/shared/StateResolver';
import useFetchRecords from '@/hooks/useFetchRecords';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import { API_BASE_URL } from '@/lib/const/api';
import type { VideoType } from '@/lib/types/models/videos';
import { type FC } from 'preact/compat';
import VideoUpsert from './partials/VideoUpsert';

const Edit: FC<{ id: number }> = ({ id }) => {
    const {
        data: video,
        loading,
        errors,
    } = useFetchRecords<VideoType>({
        url: `${API_BASE_URL}videos/${id}`,
    });

    return (
        <AdminLayout title={{ en: 'Edit Video', ru: 'Редактировать видео' }}>
            <AppTitle titleEn="Edit Video" titleRu="Редактировать видео" />
            <AdminShellLayout>
                <StateResolver errors={errors} loading={loading}>
                    {video && <VideoUpsert video={video} />}
                </StateResolver>
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default Edit;
