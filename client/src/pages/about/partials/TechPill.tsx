import { PREFIX } from '@/lib/const/api';
import { cn } from '@/lib/helpers/utils';
import type { TechStackType } from '@/lib/types/models/tech-stack';
import { locale } from '@/signals/locale';
import { getTheme } from '@/signals/theme';
import type { FC } from 'preact/compat';

const TechPill: FC<{
    className?: string;
    stack: TechStackType;
    active: boolean;
    onClick: () => void;
}> = ({ className, stack, active, onClick }) => {
    return (
        <li>
            <button
                onClick={onClick}
                class={cn(
                    'flex size-16 flex-wrap rounded-md',
                    {
                        'invert-100': getTheme() === 'dark',
                        'cursor-default shadow-sm ring ring-black': active,
                        'transition-all duration-150 hover:scale-105 hover:shadow-md hover:ring hover:ring-black/70':
                            !active,
                    },
                    className,
                )}
            >
                <img
                    src={stack.attr.url}
                    alt={stack.attr.alt[locale.value]}
                    class="m-auto size-3/4 object-contain"
                />
            </button>
        </li>
    );
};

export default TechPill;

export const TechPillFallback = () => {
    return <li class="skeleton size-16 rounded-md" />;
};
