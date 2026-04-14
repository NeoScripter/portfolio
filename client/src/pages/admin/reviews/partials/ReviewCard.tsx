import AdaptiveImg from '@/components/ui/AdaptiveImg';
import { AuthButton } from '@/components/ui/AuthButton';
import { Button } from '@/components/ui/Button';
import { useDeleteModal } from '@/context/DeleteModelContext';
import { shortenDescription } from '@/lib/helpers/utils';
import type { ReviewType } from '@/lib/types/models/reviews';
import { locale } from '@/signals/locale';
import type { FC } from 'preact/compat';

const ReviewCard: FC<{ review: ReviewType }> = ({ review }) => {
    const { itemToDelete } = useDeleteModal();
    const lang = locale.value === 'en' ? 'en' : 'ru';
    return (
        <li className="grid max-w-140 gap-6 text-sm">
            <div className="flex gap-6">
                {review.image && (
                    <AdaptiveImg
                        prtClass="size-20 shrink-0 rounded-xl"
                        alt={review?.image?.alt?.[lang]}
                        srcs={review?.image?.srcSet}
                    />
                )}
                <div>
                    <h3 class="mb-2 font-bold">{review.attr.author[lang]}</h3>
                    <div className="text-sm">
                        {shortenDescription(review.attr.description[lang])}
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-2">
                <Button
                    href={`/admin/reviews/${review.id}`}
                    class="h-9 rounded-sm text-sm"
                    variant="primary"
                >
                    Edit
                </Button>
                <AuthButton
                    class="rounded-sm"
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

export const ReviewFallback = () => {
    return (
        <li className="w-full max-w-140 list-none text-base">
            <div className="flex gap-6">
                <div class="skeleton mb-6 size-20 shrink-0 rounded-xl" />
                <div>
                    <h3 class="skeleton mb-2 w-fit rounded-sm font-bold">
                        Lorem ipsum dolor sit
                    </h3>
                    <div className="skeleton rounded-sm text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aut nostrum consequatur quas suscipit possimus
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-2">
                <div class="skeleton w-fit rounded-xl px-3 py-1">Loremmm</div>
                <div class="skeleton w-fit rounded-xl px-3 py-1">Loremmm</div>
            </div>
        </li>
    );
};
