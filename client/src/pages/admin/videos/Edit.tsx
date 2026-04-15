import { useFetch } from '@/hooks/useFetch';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import type { VideoType } from '@/lib/types/models/videos';
import { useEffect, useState, type FC } from 'preact/compat';
import VideoUpsert from './partials/VideoUpsert';
import AppTitle from '@/components/layout/AppTitle';

const Edit: FC<{ id: number }> = ({ id }) => {
    const { fetchData, loading, errors } = useFetch();
    const [video, setVideo] = useState<VideoType | null>(null);

    useEffect(() => {
        fetchData({
            url: `/api/videos/${id}`,
            onSuccess: (data) => {
                setVideo(data.data);
            },
        });
    }, []);

    if (errors != null) {
        console.error(errors);
    }

    return (
        <AdminLayout title={{ en: 'Edit Video', ru: 'Редактировать видео' }}>
            <AppTitle titleEn="Edit Video" titleRu="Редактировать видео" />
            <AdminShellLayout>
                {errors != null ? (
                    <p>{errors.errors?.message}</p>
                ) : loading || video == null ? (
                    'Loading...'
                ) : (
                    <VideoUpsert video={video} />
                )}
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default Edit;
