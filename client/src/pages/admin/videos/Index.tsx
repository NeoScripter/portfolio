import AdminShellNav from '@/components/layout/AdminShellNav';
import AppTitle from '@/components/layout/AppTitle';
import { DeleteModalProvider } from '@/context/DeleteModelContext';
import { useFetch } from '@/hooks/useFetch';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import DeleteModalLayout from '@/layouts/DeleteModalLayout';
import { range } from '@/lib/helpers/utils';
import type { VideoType } from '@/lib/types/models/videos';
import { useEffect, useState } from 'preact/hooks';
import VideoCard, { VideoFallback } from './partials/VideoCard';
import VideoDelete from './partials/VideoDelete';

const Index = () => {
    const { fetchData, loading, errors } = useFetch();
    const [videos, setVideos] = useState<VideoType[] | null>(null);

    useEffect(() => {
        const fetchVideos = () => {
            fetchData({
                url: '/api/videos?latest=true',
                onSuccess: (data) => {
                    setVideos(data.data);
                },
            });
        };

        fetchVideos();

        document.addEventListener('itemDeleted', fetchVideos);

        return () => document.removeEventListener('itemDeleted', fetchVideos);
    }, []);

    if (errors != null) {
        console.error(errors);
    }

    return (
        <DeleteModalProvider>
            <AdminLayout title={{ en: 'Videos', ru: 'Видео' }}>
                <AppTitle titleEn="Videos" titleRu="Видео" />
                <AdminShellLayout>
                    <AdminShellNav href={'videos/create'} />
                    {loading ? (
                        <ul className="space-y-8">
                            {range(0, 8).map((idx) => (
                                <VideoFallback key={idx} />
                            ))}
                        </ul>
                    ) : (
                        <ul className="space-y-8">
                            {videos &&
                                videos.map((video) => (
                                    <VideoCard key={video.id} video={video} />
                                ))}
                        </ul>
                    )}
                    <DeleteModalLayout>
                        <VideoDelete />
                    </DeleteModalLayout>
                </AdminShellLayout>
            </AdminLayout>
        </DeleteModalProvider>
    );
};

export default Index;
