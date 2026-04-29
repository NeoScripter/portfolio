import { cn, getUpdatedUrl } from '@/lib/helpers/utils';
import type { NodeProps } from '@/lib/types/shared';
import { useLocation } from 'preact-iso';
import type { FC } from 'preact/compat';

const Badge: FC<NodeProps<{ label: string; isClickable?: boolean }>> = ({
    className,
    label,
    isClickable = true,
}) => {
    const { query } = useLocation();
    const search = query?.search ?? '';
    const isActive = label.toLowerCase() === search.toLowerCase();

    return (
        <li
            class={cn(
                'border-foreground flex h-[2.25em] items-center justify-center rounded-3xl border px-[1em] leading-0',
                isActive && 'bg-foreground text-background',
                className,
            )}
            key={label}
        >
            {isClickable ? (
                <a
                    href={getUpdatedUrl([
                        { name: 'search', val: isActive ? '' : label },
                    ])}
                >
                    {label}
                </a>
            ) : (
                <span>{label}</span>
            )}
        </li>
    );
};

export default Badge;
