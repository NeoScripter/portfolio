import { AuthButton } from '@/components/ui/AuthButton';
import { Button } from '@/components/ui/Button';
import { useDeleteModal } from '@/context/DeleteModelContext';
import type { FaqType } from '@/lib/types/models/faqs';
import type { FC } from 'preact/compat';

const FaqCard: FC<{ faq: FaqType }> = ({ faq }) => {
    const { itemToDelete } = useDeleteModal();

    return (
        <li className="max-w-140 text-base">
            <h3 class="mb-3 font-bold">{faq.attr.title.en}</h3>
            <div className="mb-4">{faq.attr.description.en}</div>
            <div class="flex items-center gap-2">
                <Button
                    href={`/faqs/${faq.id}`}
                    class="text-sm"
                    variant="primary"
                >
                    Edit
                </Button>
                <AuthButton
                    class="rounded-xl"
                    onClick={() => (itemToDelete.value = faq)}
                    variant="destructive"
                >
                    Delete
                </AuthButton>
            </div>
        </li>
    );
};

export default FaqCard;

export const FaqCardSkeleton = () => {
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
            <div class="flex items-center gap-2">
                <div class="w-fit skeleton rounded-xl px-3 py-1">Loremmm</div>
                <div class="w-fit skeleton rounded-xl px-3 py-1">Loremmm</div>
            </div>
        </li>
    );
};

