
import type { ServerError } from '@/hooks/useForm';
import { cn, range } from '@/lib/helpers/utils';
import type { NodeProps } from '@/lib/types/shared';
import type { FC } from 'preact/compat';

type Props = NodeProps & {
    loading?: boolean;
    errors?: ServerError | null;
    stacks: string[] | null;
    onClick: (stack: string) => void;
};

const StackTags: FC<Props> = ({
    className,
    onClick,
    loading,
    errors,
    stacks,
}) => {
    if (loading) {
        return (
            <ul class="flex flex-wrap items-center gap-2">
                {' '}
                {range(0, 5).map((idx) => (
                    <li key={idx} class="skeleton rounded border px-3 py-1">
                        loremipsu
                    </li>
                ))}
            </ul>
        );
    }

    if (errors) {
        console.error(errors);
        return null;
    }

    if (!stacks || stacks.length === 0) return null;

    return (
        <div class={cn('flex flex-wrap gap-2', className)}>
            {stacks.map((stack) => (
                <button
                    type="button"
                    key={stack}
                    class={cn(
                        'hover:border-ring hover:ring-ring/50 border-foreground/20 rounded border px-3 py-1 transition-[color,box-shadow,border] hover:shadow-sm hover:ring-[3px]',
                    )}
                    onClick={() => onClick(stack)}
                >
                    {stack}
                </button>
            ))}
        </div>
    );
};
export default StackTags;
