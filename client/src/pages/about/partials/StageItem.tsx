import { cn } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';
import { getTheme } from '@/signals/theme';
import { type FC } from 'preact/compat';
import { type StageType } from '../data';

const StageItem: FC<{
    stage: StageType;
    active: boolean;
    order: number;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}> = ({ stage, active, order, onMouseEnter, onMouseLeave }) => {
    const lang = locale.value === 'ru' ? 'ru' : 'en';

    return (
        <li
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            class={cn(
                'bg-user-background ring-accent-foreground/15 rounded-md p-8 ring-1 transition-[shadow,scale]',
                {
                    'shadow-video scale-102': active,
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
            <h3 key={`${lang}-heading`} class="motion-safe:animate-fade-in mb-3 text-xl font-bold xl:mb-4 xl:text-[1.325rem]">{`${order}. ${stage.title[lang]}`}</h3>
            <p key={`${lang}-content`} class="motion-safe:animate-fade-in text-sm sm:text-base xl:text-lg">
                {stage.description[lang]}
            </p>
        </li>
    );
};

export default StageItem;
