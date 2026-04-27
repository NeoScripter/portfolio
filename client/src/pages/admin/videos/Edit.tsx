import AppTitle from '@/components/layout/AppTitle';
import StateResolver from '@/components/shared/StateResolver';
import ApiError from '@/components/ui/ApiError';
import { useFetch } from '@/hooks/useFetch';
import type { ServerError } from '@/hooks/useForm';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import { API_BASE_URL } from '@/lib/const/api';
import { hasErrorDetails } from '@/lib/helpers/utils';
import type { VideoType } from '@/lib/types/models/videos';
import { useEffect, useState, type FC } from 'preact/compat';
import VideoUpsert from './partials/VideoUpsert';

const Edit: FC<{ id: number }> = ({ id }) => {
    const { fetchData, loading, errors } = useFetch();
    const [video, setVideo] = useState<VideoType | null>(null);

    useEffect(() => {
        fetchData({
            url: `${API_BASE_URL}videos/${id}`,
            onSuccess: (data) => {
                setVideo(data.data);
            },
        });
    }, []);

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
