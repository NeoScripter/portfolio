import AdaptiveImg from "@/components/ui/AdaptiveImg";
import { AuthButton } from "@/components/ui/AuthButton";
import { Button } from "@/components/ui/Button";
import CardActions from "@/components/ui/CardActions";
import { useDeleteModal } from "@/context/DeleteModelContext";
import type { VideoType } from "@/lib/types/models/videos";
import { locale } from "@/signals/locale";
import type { FC } from "preact/compat";


const VideoCard: FC<{ video: VideoType }> = ({ video }) => {
    const { itemToDelete } = useDeleteModal();
    return (
        <li className="max-w-140 text-base">
            {video.image && (
                <AdaptiveImg
                    prtClass="w-60 shadow-md aspect-video mb-6 shrink-0 rounded-xl"
                    alt={video.image?.alt?.[locale.value]}
                    srcs={video.image.srcSet}
                />
            )}

            <CardActions
                path={`/admin/videos/${video.id}`}
                onClick={() => (itemToDelete.value = video)}
            />
        </li>
    );
};

export default VideoCard;

export const VideoFallback = () => {
    return (
        <li className="w-full max-w-140 list-none text-base">
            <div class="skeleton mb-6 w-60 aspect-video shrink-0 rounded-xl" />

            <div class="flex items-center gap-2">
                <div class="skeleton w-fit rounded-xl px-3 py-1">
                    Loremmm
                </div>
                <div class="skeleton w-fit rounded-xl px-3 py-1">
                    Loremmm
                </div>
            </div>
        </li>
    );
};
