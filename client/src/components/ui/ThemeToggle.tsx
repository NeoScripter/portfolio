import getHeaderVariant from '@/lib/helpers/getHeaderVariant';
import { cn } from '@/lib/helpers/utils';
import { getTheme, theme } from '@/signals/theme';
import type { TargetedEvent } from 'preact';
import { useRoute } from 'preact-iso';
import type { FC } from 'preact/compat';

const ThemeToggle: FC<{ className?: string }> = ({ className }) => {
    const { path } = useRoute();
    const variant = getHeaderVariant(path);

    const handleChange = (e: TargetedEvent<HTMLInputElement, Event>) => {
        if (e.currentTarget.checked) {
            theme.value = 'dark';
        } else {
            theme.value = 'light';
        }
    };

    const isDark = getTheme() === 'dark';

    return (
        <div
            class={cn(
                'theme-switch relative flex items-center gap-3',
                className,
            )}
        >
            <input
                id="switch"
                type="checkbox"
                checked={isDark}
                onChange={handleChange}
                aria-label="Переключить тему"
                aria-checked={isDark}
                role="switch"
            />
            <label
                htmlFor="switch"
                class={cn('border-foreground/50 w-17 border-2 border-dotted xl:w-18', {
                    'lg:border-white/50': variant === 'primary',
                })}
                aria-hidden="true"
            />
        </div>
    );
};

export default ThemeToggle;
