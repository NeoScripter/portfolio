
import AdaptiveImg from '@/components/ui/AdaptiveImg';
import { AuthButton } from '@/components/ui/AuthButton';
import { Button } from '@/components/ui/Button';
import { useDeleteModal } from '@/context/DeleteModelContext';
import type { ReviewType } from '@/lib/types/models/reviews';
import { locale } from '@/signals/locale';
import type { FC } from 'preact/compat';

const ReviewCard: FC<{ review: ReviewType }> = ({ review }) => {
    const { itemToDelete } = useDeleteModal();
    return (
        <li className="max-w-140 text-base">
            <h3 class="mb-3 font-bold">{review.attr.author.en}</h3>
            <div className="mb-4">{review.attr.description.en}</div>
            {review.image && (
                <AdaptiveImg
                    prtClass="size-40 mb-6 shrink-0 rounded-xl"
                    alt={review?.image?.alt?.[locale.value]}
                    srcs={review?.image?.srcSet}
                />
            )}

            <div class="flex items-center gap-2">
                <Button
                    href={`/reviews/${review.id}`}
                    class="text-sm"
                    variant="primary"
                >
                    Edit
                </Button>
                <AuthButton
                    class="rounded-xl"
                    onClick={() => (itemToDelete.value = review)}
                    variant="destructive"
                >
                    Delete
                </AuthButton>
            </div>
        </li>
    );
};

export default ReviewCard;

export const ReviewCardSkeleton = () => {
    return (
        <li className="w-full list-none max-w-140 text-base">
            <h3 class="skeleton mb-3 w-fit rounded-sm font-bold">
                Lorem ipsum dolor sit
            </h3>
            <div className="skeleton mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                nostrum consequatur quas suscipit possimus temporibus! Quis
                molestias minima illum accusantium! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Tempora, earum!
            </div>
            <div class="skeleton mb-6 size-40 shrink-0 rounded-xl" />

            <div class="flex items-center gap-2">
                <div class="w-fit skeleton rounded-xl px-3 py-1">Loremmm</div>
                <div class="w-fit skeleton rounded-xl px-3 py-1">Loremmm</div>
            </div>
        </li>
    );
};
