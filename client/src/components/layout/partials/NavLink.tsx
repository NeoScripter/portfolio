import AnimatedUnderline from '@/components/ui/AnimatedUnderline';
import getHeaderVariant from '@/lib/helpers/getHeaderVariant';
import { cn } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';
import { useRoute } from 'preact-iso';
import type { FC } from 'preact/compat';
import type { NavLinkType } from '../data';
import { playAudio } from '@/lib/helpers/playAudio';

const NavLink: FC<{
    className?: string;
    link: NavLinkType;
    show: boolean;
    idx: number;
}> = ({ className, idx, link, show }) => {
    const { path } = useRoute();
    const variant = getHeaderVariant(path);

    const active = path === link.path;
    const lang = locale.value === 'ru' ? 'ru' : 'en';

    const Icon = link.icon;

    return (
        <li class="select-none">
            <a
                class={cn(
                    'group motion-safe:animate-fade-in relative transition-transform duration-300 ease-in-out  mx-auto flex w-fit min-w-30 items-center gap-3 font-medium lg:min-w-0 lg:font-normal',
                    {
                        'cursor-default lg:font-bold': active,
                        'slide-in': show,
                    },
                    className,
                )}
                href={link.path}
                onClick={() => playAudio('nextPage')}
                aria-current={active ? 'page' : undefined}
                style={{
                    '--slide-delay': `${show ? idx * 200 + 100 : 100}ms`,
                }}
            >
                {active && (
                    <span
                        aria-hidden="true"
                        class="border-foreground/30 bg-background pointer-events-none absolute -inset-x-6 -inset-y-2 -z-4 rounded-md border lg:hidden"
                    />
                )}
                <Icon
                    class="size-5 shrink-0 lg:hidden"
                    aria-hidden="true"
                    strokeWidth={2.5}
                />
                <span>{link.label[lang]}</span>

                <AnimatedUnderline
                    className={cn('lg:bg-foreground hidden lg:block', {
                        'hidden group-hover:hidden': active,
                        'h-px': !active,
                        'lg:bg-white': variant === 'primary',
                    })}
                />
            </a>
        </li>
    );
};

export default NavLink;
