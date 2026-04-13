import getHeaderVariant from '@/lib/helpers/getHeaderVariant';
import { cn } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';
import { useRoute } from 'preact-iso';
import type { FC } from 'preact/compat';

const LangToggle: FC<{ className?: string }> = ({ className }) => {
    const { path } = useRoute();
    const variant = getHeaderVariant(path);

    return (
        <div
            class={cn(
                'divide-foreground flex items-center divide-x-2 text-base lg:divide-none lg:border-input lg:rounded-full lg:border lg:px-4 lg:py-1',
                { 'lg:border-white/30': variant === 'primary' },
                className,
            )}
        >
            <Button lang="ru" className="pr-3 lg:pr-2" />
            <Button lang="en" className="pl-3 lg:pl-1" />
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
