import { useClickOutside } from '@/hooks/useClickOutside';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { cn } from '@/lib/helpers/utils';
import { currentUser } from '@/signals/auth';
import { locale } from '@/signals/locale';
import { hide, isHidden, isMini, isWide } from '@/signals/sidebar-state';
import { ChevronsUpDown } from 'lucide-preact';
import { useId } from 'preact/hooks';
import AuthLogo from '../ui/AuthLogo';
import Monogram from '../ui/Monogram';
import { sidebarLinks } from './data';
import AccountMenu from './partials/AccountMenu';
import SidebarLink from './partials/SidebarLink';

function Sidebar() {
    const id = useId();

    const handleClick = (e: MouseEvent) => {
        const el = e.target as HTMLElement | null;
        if (!el || el.id !== id) return;

        hide();
    };

    return (
        <div
            id={id}
            onClick={handleClick}
            class={cn(
                'md:bg-sidebar fixed inset-0 z-20 bg-black/75 transition-all md:static md:w-full md:shrink-0 md:self-stretch',
                {
                    'pointer-events-none bg-transparent': isHidden.value,
                    'transition-colors md:max-w-62': isWide.value,
                    'md:max-w-14': isMini.value,
                },
            )}
        >
            <aside
                class={cn(
                    'bg-sidebar inset-y-0 left-0 flex min-h-full w-full max-w-72 flex-col px-3 py-2 transition-all md:fixed md:max-w-62',
                    {
                        '-translate-x-full': isHidden.value,
                        'translate-x-0 md:max-w-62': isWide.value,
                        'md:max-w-16': isMini.value,
                    },
                )}
            >
                <Header />
                <NavMenu />
                <Footer />
            </aside>
        </div>
    );
}

export default Sidebar;

const Header = () => {
    const lang = locale.value === 'ru' ? 'ru' : 'en';

    return (
        <header
            class={cn('flex items-center relative select-none', {
                'm-2 gap-4': !isMini.value,
                'mx-auto my-2': isMini.value,
            })}
        >
            <a href="/" className='absolute inset-0'/>
            <div
                class={cn(
                    'bg-sidebar-primary text-sidebar-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-[2px] p-1',
                )}
            >
                <AuthLogo />
            </div>
            <div
                class={cn(
                    'ease overflow-x-clip font-medium whitespace-nowrap transition-[max-width] duration-300',
                    !isMini.value ? 'max-w-64' : 'max-w-0',
                )}
            >
                {lang === 'en' ? 'Admin Panel' : ' Админ панель'}
            </div>
        </header>
    );
};

const NavMenu = () => {
    const lang = locale.value === 'ru' ? 'ru' : 'en';

    return (
        <div>
            {!isMini.value && (
                <div class="text-sidebar-foreground/70 mx-2 pt-4 pb-1.5 text-xs">
                    Platform
                </div>
            )}

            <ul class="text-sidebar-accent-foreground/70">
                {sidebarLinks.map((link) => (
                    <SidebarLink
                        key={link.id}
                        url={link.path}
                        icon={link.icon}
                        label={link.label[lang]}
                    />
                ))}
            </ul>
        </div>
    );
};

const Footer = () => {
    const id = useId();
    const menuId = `${id}-menu`,
        btnId = `${id}-btn`;
    const { show, setShow } = useClickOutside([`#${menuId}`, `#${btnId}`]);

    useEscapeKey(() => setShow(false));

    const handleShowClick = () => {
        setShow((o) => !o);
    };

    return (
        <footer class="relative mt-auto mb-2">
            <AccountMenu
                id={menuId}
                name={currentUser.value?.name || ''}
                show={show}
            />

            <button
                id={btnId}
                onClick={handleShowClick}
                class={cn(
                    'text-sidebar-foreground active:bg-sidebar-accent hover:bg-sidebar-accent ease flex items-center gap-2 rounded-sm transition-all duration-200',
                    {
                        'w-full px-3 py-2': isWide.value,
                        'w-fit': isMini.value,
                    },
                )}
            >
                <Monogram firstName={currentUser.value?.name || ''} />

                {isWide.value && (
                    <>
                        <span>{currentUser.value?.name || ''}</span>
                        <ChevronsUpDown class="ml-auto size-4" />
                    </>
                )}
            </button>
        </footer>
    );
};
