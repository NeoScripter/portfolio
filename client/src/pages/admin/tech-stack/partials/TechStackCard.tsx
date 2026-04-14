import { AuthButton } from "@/components/ui/AuthButton";
import { Button } from "@/components/ui/Button";
import { useDeleteModal } from "@/context/DeleteModelContext";
import type { TechStackType } from "@/lib/types/models/tech-stack";
import type { FC } from "preact/compat";

const TechStackCard: FC<{ stack: TechStackType }> = ({ stack }) => {
    const { itemToDelete } = useDeleteModal();
    return (
        <li className="max-w-140 text-base">
            <div class="border-foreground/40 my-4 flex size-20 shrink-0 items-center justify-center rounded-xl border">
                <img src={stack.attr.image} alt="" />
            </div>

            <div class="flex items-center gap-2">
                <Button
                    href={`/admin/stacks/${stack.id}`}
                    class="h-9 rounded-sm text-sm"
                    variant="primary"
                >
                    Edit
                </Button>
                <AuthButton
                    class="rounded-sm"
                    onClick={() => (itemToDelete.value = stack)}
                    variant="destructive"
                >
                    Delete
                </AuthButton>
            </div>
        </li>
    );
};

export default TechStackCard;

export const TechStackFallback = () => {
    return (
        <li className="w-full max-w-140 list-none text-base">
            <div class="skeleton my-4 size-20 shrink-0 rounded-xl"></div>

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
