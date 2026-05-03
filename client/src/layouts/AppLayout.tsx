import clickSound from '@/assets/audio/click.mp3';
import AppFooter from '@/components/layout/AppFooter';
import AppHeader from '@/components/layout/AppHeader';
import Webform from '@/components/shared/Webform';
import { ModalProvider } from '@/context/ModalContext';
import { cn, playAudio } from '@/lib/helpers/utils';
import type { ComponentChildren } from 'preact';
import { useEffect, type FC } from 'preact/compat';
import { Toaster } from 'sonner';
import ModalLayout from './ModalLayout';

const AppLayout: FC<{
    children: ComponentChildren;
    className?: string;
}> = ({ children, className }) => {

    useEffect(() => {
        document
            .querySelectorAll('.clickable-btn')
            .forEach((button) =>
                button.addEventListener('click', () => playAudio(clickSound)),
            );
    }, []);

    return (
        <ModalProvider>
            <main
                key="app-layout"
                class={cn(
                    'full-bleed-wrapper mx-auto max-w-480 overflow-x-clip md:pt-4',
                    className,
                )}
                id="wrapper"
            >
                <AppHeader />

                {children}

                <AppFooter />

                <ModalLayout className="max-w-100 px-10 py-14 lg:max-w-160">
                    <Webform />
                </ModalLayout>

                <Toaster position="top-center" />
            </main>
        </ModalProvider>
    );
};

export default AppLayout;
