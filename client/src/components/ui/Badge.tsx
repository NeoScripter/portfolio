import { playAudio } from '@/lib/helpers/playAudio';
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
                'border-foreground flex items-center justify-center rounded-3xl border px-[1em] py-[0.25em] break-all hyphens-auto',
                isActive && 'bg-foreground text-background font-semibold',
                isClickable &&
                    'hover:ring-footer-text focus-visible:border-ring focus-visible:ring-muted-foreground/50 shadow-xs transition-[color,box-shadow,opacity] outline-none hover:ring-2 focus-visible:ring-2',
                className,
            )}
            key={label}
        >
            {isClickable ? (
                <a
                    href={getUpdatedUrl([
                        { name: 'search', val: isActive ? '' : label },
                    ])}
                    onClick={() => playAudio('nextPage')}
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
