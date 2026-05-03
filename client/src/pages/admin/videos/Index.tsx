import AdminShellNav from '@/components/layout/AdminShellNav';
import AppTitle from '@/components/layout/AppTitle';
import { DeleteModalProvider } from '@/context/DeleteModelContext';
import useFetchRecords from '@/hooks/useFetchRecords';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import DeleteModalLayout from '@/layouts/DeleteModalLayout';
import { API_BASE_URL } from '@/lib/const/api';
import { hasErrorDetails, range } from '@/lib/helpers/utils';
import type { VideoType } from '@/lib/types/models/videos';
import VideoCard, { VideoFallback } from './partials/VideoCard';
import VideoDelete from './partials/VideoDelete';

const Index = () => {
    const {
        data: videos,
        loading,
        errors,
    } = useFetchRecords<VideoType[]>({
        url: `${API_BASE_URL}videos`,
    });

    if (hasErrorDetails(errors)) {
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
                            {videos && videos.length > 0 ? (
                                videos.map((video) => (
                                    <VideoCard key={video.id} video={video} />
                                ))
                            ) : (
                                <p>You haven't added any videos yet</p>
                            )}
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
