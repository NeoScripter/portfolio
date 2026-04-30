import '@/assets/css/auth.css';
import Sidebar from '@/components/layout/Sidebar';
import { Toaster } from '@/components/ui/Toaster';
import { ModalProvider } from '@/context/ModalContext';
import { MD } from '@/lib/const/breakpoints';
import { cn } from '@/lib/helpers/utils';
import type { PageTitleType } from '@/lib/types/shared';
import { locale } from '@/signals/locale';
import {
    expand,
    hide,
    isHidden,
    isMini,
    minify,
} from '@/signals/sidebar-state';
import { PanelLeftIcon } from 'lucide-preact';
import type { ComponentChildren } from 'preact';
import { ErrorBoundary } from 'preact-iso';
import type { FC } from 'preact/compat';

const AdminLayout: FC<{
    children: ComponentChildren;
    title: PageTitleType;
}> = ({ children, title }) => {
    const lang = locale.value === 'en' ? 'en' : 'ru';

    const handleHeaderClick = () => {
        if (window.innerWidth >= MD) {
            isMini.value ? expand() : minify();
        } else {
            isHidden.value ? expand() : hide();
        }
    };
    return (
        <ErrorBoundary>
            <ModalProvider>
                <main
                    key="admin-layout"
                    class={cn(
                        'text-sidebar-foreground bg-sidebar h-full min-h-svh text-sm md:flex md:items-start md:p-2',
                    )}
                    id="admin"
                >
                    <Sidebar />

                    <div class="bg-background border-muted w-full border shadow-sm md:rounded-lg">
                        <header
                            class={
                                'border-muted flex items-center gap-3 border-b px-4 py-4'
                            }
                        >
                            <button
                                onClick={handleHeaderClick}
                                class="hover:bg-accent rounded-sm p-1.5 transition-colors duration-200"
                            >
                                <PanelLeftIcon class="size-4" />
                            </button>
                            <span>{title[lang]}</span>
                        </header>
                        {children}
                    </div>
                    <Toaster position="top-center" />
                </main>
            </ModalProvider>
        </ErrorBoundary>
    );
};

export default AdminLayout;
