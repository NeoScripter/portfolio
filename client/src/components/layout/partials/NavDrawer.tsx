import BgDark from '@/assets/imgs/shared/mb-menu-dark.webp';
import BgLight from '@/assets/imgs/shared/mb-menu-light.webp';
import LangToggle from '@/components/ui/LangToggle';
import Logo from '@/components/ui/Logo';
import MuteBtn from '@/components/ui/MuteBtn';
import ThemeToggle from '@/components/ui/ThemeToggle';
import getHeaderVariant from '@/lib/helpers/getHeaderVariant';
import { cn } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';
import { getTheme } from '@/signals/theme';
import { useRoute } from 'preact-iso';
import { NavMenu } from './NavMenu';

type NavDrawerProps = { show: boolean };

export default function NavDrawer({ show }: NavDrawerProps) {
    const { path } = useRoute();
    const variant = getHeaderVariant(path);
    const lang = locale.value === 'en' ? 'en' : 'ru';

    return (
        <div
            id="nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Навигационное меню"
            class={cn(
                'bg-background ease-nav-drawer lg:hidden fixed top-0 right-0 z-0 w-80 max-w-full overflow-y-auto rounded-bl-2xl bg-cover bg-top-left bg-no-repeat px-8 py-7 transition-transform duration-900',
                !show && 'translate-x-full',
            )}
            style={{
                backgroundImage: `url(${getTheme() === 'dark' ? BgDark : BgLight})`,
            }}
        >
            <header>
                <div>
                    <div
                        key={lang}
                        class={cn(
                            'motion-safe:animate-fade-in mt-3 mb-8 w-36',
                            show && 'slide-in',
                            {
                                'text-foreground': variant === 'primary',
                            },
                        )}
                    >
                        <Logo className="w-32" />
                    </div>
                </div>
                <span
                    aria-hidden="true"
                    class="bg-muted-foreground/40 -mx-3 block h-0.5"
                ></span>
            </header>

            <NavMenu show={show} />

            <footer>
                <div class="text-foreground flex items-center justify-between gap-3 font-bold">
                    <LangToggle />
                    <ThemeToggle />
                    <MuteBtn />
                </div>
            </footer>
        </div>
    );
}
