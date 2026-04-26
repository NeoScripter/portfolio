import type { ServerError } from '@/hooks/useForm';
import { cn, range } from '@/lib/helpers/utils';
import type { NodeProps } from '@/lib/types/shared';
import { Trash2 } from 'lucide-preact';
import type { FC } from 'preact/compat';

type Props = NodeProps & {
    loading?: boolean;
    errors?: ServerError | null;
    stacks: string[] | null;
    onClick: (stack: string) => void;
    isDestructive: boolean;
};

const StackTags: FC<Props> = ({
    className,
    onClick,
    loading,
    errors,
    stacks,
    isDestructive,
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
                        isDestructive
                            ? 'group relative'
                            : 'hover:border-ring hover:ring-ring/50 hover:shadow-sm hover:ring-[3px]',
                        'border-foreground/20 rounded border px-3 py-1 transition-[color,box-shadow,border]',
                    )}
                    onClick={() => onClick(stack)}
                >
                    {stack}
                    {isDestructive && (
                        <span className="absolute inset-0 flex items-center justify-center bg-red-500/50 text-white opacity-0 transition-opacity group-hover:opacity-100">
                            <Trash2 className="size-4" />
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
};
export default StackTags;
