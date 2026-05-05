import { useModal } from '@/context/ModalContext';
import useAutoHideOnScroll from '@/hooks/useAutoHideOnScroll';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import useScrollOffset from '@/hooks/useScrollOffset';
import { LG } from '@/lib/const/breakpoints';
import type { VariantType } from '@/lib/helpers/getHeaderVariant';
import getHeaderVariant from '@/lib/helpers/getHeaderVariant';
import getHeroOffset from '@/lib/helpers/getHeroOffset';
import { cn } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';
import { useRoute } from 'preact-iso';
import { type FC } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import BurgerMenu from '../ui/BurgerMenu';
import LangToggle from '../ui/LangToggle';
import Logo from '../ui/Logo';
import ThemeToggle from '../ui/ThemeToggle';
import NavDrawer from './partials/NavDrawer';
import { NavMenu } from './partials/NavMenu';
import Overlay from './partials/Overlay';
import Separator from './partials/Separator';
import MuteBtn from '../ui/MuteBtn';

const AppHeader: FC<{ className?: string }> = ({ className }) => {
    const { showModal } = useModal();
    const { path } = useRoute();

    const variant: VariantType = getHeaderVariant(path);

    const { show: showMenu, setShow: setShowMenu } = useClickOutside([
        '#nav-drawer',
        '#burger-menu',
    ]);

    let { isBelow: isBelowPadding } = useScrollOffset(16);
    const hide = useAutoHideOnScroll();

    const isBrowser = typeof window !== 'undefined';

    let { isBelow: isBelowHero } = useScrollOffset(
        isBrowser ? getHeroOffset(window.innerWidth) : 0,
    );

    if (variant === 'ghost') {
        isBelowHero = isBelowPadding = true;
    }

    useEscapeKey(() => setShowMenu(false));

    const [showDrawer, setShowDrawer] = useState(false);

    const lang = locale.value === 'ru' ? 'ru' : 'en';

    const toggleMenu = () => {
        setShowMenu((p) => !p);
    };

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        const mq = window.matchMedia(`(max-width: ${LG}px)`);
        setShowDrawer(mq.matches);

        const update = (e: MediaQueryListEvent) => setShowDrawer(e.matches);
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    return (
        <header
            inert={showModal.value}
            class={cn(
                'sticky inset-x-0 top-0 isolate z-10 -mt-[100%] h-fit',
                isBelowPadding ? 'md:top-0' : 'md:top-4',
                isBelowHero && 'full-bleed',
                {
                    '-translate-y-full': hide,
                },
            )}
        >
            <div
                class={cn(
                    'bg-background/50 mx-auto flex max-w-480 items-center justify-between overflow-x-clip px-7 py-8 backdrop-blur-sm sm:px-15 sm:pt-11 sm:pb-9 lg:px-14 2xl:px-24 xl:pb-12',
                    className,
                    {
                        'md:rounded-t-xl xl:max-w-432 2xl:max-w-432':
                            !isBelowHero,
                        'bg-home-hero-bg/40 text-white': variant === 'primary',
                        'bg-muted/40': variant === 'secondary',
                        'text-foreground': variant === 'ghost',
                    },
                )}
            >
                <div key={lang} class="motion-safe:animate-fade-in w-40">
                    <Logo />
                </div>

                {showDrawer && (
                    <>
                        {' '}
                        <Overlay show={showMenu} />
                        <BurgerMenu
                            show={showMenu}
                            onClick={toggleMenu}
                            className="z-5"
                            aria-label={
                                showMenu ? 'Закрыть меню' : 'Открыть меню'
                            }
                            aria-expanded={showMenu}
                            aria-controls="nav-drawer"
                        />
                        <NavDrawer show={showMenu} />
                    </>
                )}

                {!showDrawer && (
                    <div class="flex items-center gap-11 xl:w-full xl:gap-14">
                        <LangToggle className="xl:ml-auto" />
                        <NavMenu className="xl:mr-auto" />
                        <ThemeToggle />
                        <MuteBtn />
                    </div>
                )}

                {!isBelowHero &&
                    (variant === 'primary' || variant === 'secondary') && (
                        <Separator />
                    )}
            </div>
        </header>
    );
};

export default AppHeader;
