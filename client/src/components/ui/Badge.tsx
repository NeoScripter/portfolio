import { cn } from '@/lib/helpers/utils';
import type { NodeProps } from '@/lib/types/shared';
import type { FC } from 'preact/compat';

const Badge: FC<NodeProps<{ label: string }>> = ({ className, label }) => {
    return (
        <li
            class={cn(
                'border-foreground flex h-[2.25em] items-center justify-center rounded-3xl border px-[1em] leading-0',
                className,
            )}
            key={label}
        >
            {label}
        </li>
    );
};

export default Badge;
