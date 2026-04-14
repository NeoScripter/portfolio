import { cn } from '@/lib/helpers/utils';
import type { NodeProps } from '@/lib/types/shared';
import type { FC } from 'preact/compat';
import { AuthButton } from './AuthButton';
import { Button } from './Button';

const CardActions: FC<NodeProps<{ path: string; onClick: () => void }>> = ({
    className,
    path,
    onClick,
}) => {
    return (
        <div class={cn('flex items-center gap-2', className)}>
            <Button
                href={path}
                class="h-9 rounded-sm text-sm"
                variant="primary"
            >
                Edit
            </Button>
            <AuthButton
                class="rounded-sm"
                onClick={onClick}
                variant="destructive"
            >
                Delete
            </AuthButton>
        </div>
    );
};

export default CardActions;
