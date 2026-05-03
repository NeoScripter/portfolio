import AdaptiveImg from '@/components/ui/AdaptiveImg';
import CardActions from '@/components/ui/CardActions';
import { useDeleteModal } from '@/context/DeleteModelContext';
import type { TechStackType } from '@/lib/types/models/tech-stack';
import { locale } from '@/signals/locale';
import type { FC } from 'preact/compat';

const TechStackCard: FC<{ stack: TechStackType }> = ({ stack }) => {
    const { itemToDelete } = useDeleteModal();
    return (
        <li className="border-muted-foreground/40 max-w-140 rounded-sm border p-4 text-base">
            <div class="mb-4 flex items-center gap-3">
                <div class="border-foreground/40 flex size-18 shrink-0 items-center justify-center overflow-clip rounded-sm border">
                    <AdaptiveImg
                        prtClass="size-4/5"
                        imgClass="object-contain object-center"
                        srcs={stack.image.srcSet}
                        alt={stack.image?.alt?.[locale.value]}
                    />
                </div>
            </div>

            <CardActions
                path={`/admin/stacks/${stack.id}`}
                onClick={() => (itemToDelete.value = stack)}
            />
        </li>
    );
};

export default TechStackCard;

export const TechStackFallback = () => {
    return (
        <li className="w-full max-w-140 list-none text-base">
            <div class="skeleton my-4 size-20 shrink-0 rounded-xl"></div>

            <div class="flex items-center gap-2">
                <div class="skeleton w-fit rounded-xl px-3 py-1">Loremmm</div>
                <div class="skeleton w-fit rounded-xl px-3 py-1">Loremmm</div>
            </div>
        </li>
    );
};
