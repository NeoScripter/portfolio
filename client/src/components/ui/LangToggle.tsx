import getHeaderVariant from '@/lib/helpers/getHeaderVariant';
import { cn, playAudio } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';
import type { TargetedEvent } from 'preact';
import { useRoute } from 'preact-iso';
import type { FC } from 'preact/compat';
import toggleSound from '@/assets/audio/toggle.mp3';

const LangToggle: FC<{ className?: string }> = ({ className }) => {
    const { path } = useRoute();
    const variant = getHeaderVariant(path);

    const handleChange = (e: TargetedEvent<HTMLInputElement, Event>) => {
        if (e.currentTarget.checked) {
            locale.value = 'en';
        } else {
            locale.value = 'ru';
        }
        playAudio(toggleSound);
    };

    return (
        <div
            className={cn(
                'flex items-center justify-center gap-3',
                className,
            )}
        >
            <Button lang='ru' />
            <div class={cn('lang-switch relative flex items-center gap-3')}>
                <input
                    id="lang-toggle"
                    type="checkbox"
                    checked={locale.value === 'en'}
                    onChange={handleChange}
                    aria-label="Переключить тему"
                    aria-checked={locale.value === 'en'}
                    role="switch"
                />
                <label
                    htmlFor="lang-toggle"
                    class={cn('border-foreground/50 w-15 border-2 border-dotted xl:w-16', {
                        'lg:border-white/50': variant === 'primary',
                    })}
                    aria-hidden="true"
                />
            </div>
            <Button lang='en' />
        </div>
    );
};

export default LangToggle;

const Button: FC<{ lang: 'en' | 'ru'; className?: string }> = ({
    lang,
    className,
}) => {
    const active = locale.value === lang;

    return (
        <button
            onClick={() => (locale.value = lang)}
            class={cn(
                '',
                active ? 'font-bold' : 'font-normal opacity-50',
                className,
            )}
        >
            {lang.toUpperCase()}
        </button>
    );
};
