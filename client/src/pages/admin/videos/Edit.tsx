import AppTitle from '@/components/layout/AppTitle';
import ApiError from '@/components/ui/ApiError';
import { useFetch } from '@/hooks/useFetch';
import type { ServerError } from '@/hooks/useForm';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import { PREFIX } from '@/lib/const/api';
import type { VideoType } from '@/lib/types/models/videos';
import { useEffect, useState, type FC } from 'preact/compat';
import VideoUpsert from './partials/VideoUpsert';

const Edit: FC<{ id: number }> = ({ id }) => {
    const { fetchData, loading, errors } = useFetch();
    const [video, setVideo] = useState<VideoType | null>(null);

    useEffect(() => {
        fetchData({
            url: `${PREFIX}videos/${id}`,
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
                <Content video={video} errors={errors} loading={loading} />
            </AdminShellLayout>
        </AdminLayout>
    );
};

export default Edit;

const Content: FC<{
    video: VideoType | null;
    errors: ServerError | null;
    loading: boolean;
}> = ({ video, errors, loading }) => {
    if (loading) {
        return 'Loading...';
    }

    if (errors != null)
        return (
            <ApiError
                resourceRu="Videos"
                mb={true}
                resourceEn="Videos"
                className="ml-0"
            />
        );

    return video && <VideoUpsert video={video} />;
};
