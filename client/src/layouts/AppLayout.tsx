import AppFooter from "@/components/layout/AppFooter";
import AppHeader from "@/components/layout/AppHeader";
import { ModalProvider } from "@/context/ModalContext";
import { cn } from "@/lib/helpers/utils";
import type { ComponentChildren } from "preact";
import type { FC } from "preact/compat";
import { Toaster } from "sonner";

const AppLayout: FC<{
    children: ComponentChildren;
    className?: string;
}> = ({ children, className }) => {
    return (
        <ModalProvider>
            <main
                class={cn(
                    'mx-auto max-w-480 overflow-x-clip md:px-4 md:pt-4 xl:px-24',
                    className
                )}
                id="wrapper"
            >
                    <AppHeader />
                {/* <AppHeaderContext.Provider value={{ variant }}> */}
                {/*     <AppHeader /> */}
                {/* </AppHeaderContext.Provider> */}

                {children}

                <AppFooter />

                {/* <ModalLayout className="max-w-100 px-10 py-14 lg:max-w-160"> */}
                {/*     <EmailForm /> */}
                {/* </ModalLayout> */}

                <Toaster position="top-center" />
            </main>
        </ModalProvider>
    );
};

export default AppLayout;
