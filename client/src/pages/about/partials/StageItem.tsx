import { cn } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';
import { getTheme } from '@/signals/theme';
import { type FC } from 'preact/compat';
import { type StageType } from '../data';

const StageItem: FC<{
    stage: StageType;
    active: boolean;
    order: number;
    isEven: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}> = ({ stage, active, order, isEven, onMouseEnter, onMouseLeave }) => {
    const lang = locale.value === 'ru' ? 'ru' : 'en';

    return (
        <li
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            class={cn(
                'bg-user-background ring-accent-foreground/15 max-w-110 rounded-md p-8 ring-1 transition-[shadow,scale]',
                {
                    'shadow-video scale-102': active,
                    'md:mt-8': isEven,
                    'md:mb-8': !isEven,
                },
            )}
        >
            <div
                class={cn('mb-8 size-18 rounded-sm p-5', {
                    'bg-foreground text-white':
                        active && getTheme() === 'light',
                    'text-background bg-gray-300':
                        active && getTheme() === 'dark',
                    'bg-gray-300/50': !active && getTheme() === 'light',
                    'bg-footer-bg': !active && getTheme() === 'dark',
                })}
            >
                <stage.icon class="size-8" />
            </div>
            <h4 class="mb-3 text-xl font-bold 2xl:text-2xl">{`${order}. ${stage.title[lang]}`}</h4>
            <p class="text-sm sm:text-base xl:text-sm 2xl:text-base">
                {stage.description[lang]}
            </p>
        </li>
    );
};

export default StageItem;
