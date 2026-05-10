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
        data: videoData,
        loading,
        errors,
    } = useFetchRecords<{data: VideoType}>({
        url: `${API_BASE_URL}videos/${id}`,
    });

    return (
        <AdminLayout title={{ en: 'Edit Video', ru: 'Редактировать видео' }}>
            <AppTitle titleEn="Edit Video" titleRu="Редактировать видео" />
            <AdminShellLayout>
                <StateResolver errors={errors} loading={loading}>
                    {videoData?.data && <VideoUpsert video={videoData.data} />}
                </StateResolver>
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default Edit;
