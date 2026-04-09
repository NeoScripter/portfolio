import getHeaderVariant from '@/lib/helpers/getHeaderVariant';
import { useRoute } from 'preact-iso';
import type { FC } from 'preact/compat';
import NavLink from './NavLink';
import { navLinks } from '../data';
import { cn } from '@/lib/helpers/utils';

export const NavMenu: FC<{ show?: boolean; className?: string }> = ({
    show = false,
    className,
}) => {
    const { path } = useRoute();
    const variant = getHeaderVariant(path);

    return (
        <nav
            class={cn('text-foreground', className)}
            aria-label="Основная навигация"
        >
            <ul
                class={cn(
                    'my-17 space-y-13 lg:my-0 lg:flex lg:items-center lg:gap-12 lg:space-y-0 xl:gap-14',
                    {
                        'lg:text-white': variant === 'primary',
                    }
                )}
            >
                {navLinks.map((navLink, idx) => (
                    <NavLink
                        show={show}
                        key={navLink.id}
                        idx={idx}
                        link={navLink}
                    />
                ))}
            </ul>
        </nav>
    );
};
