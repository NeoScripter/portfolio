import { useModal } from '@/context/ModalContext';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { events } from '@/lib/const/events';
import { playAudio } from '@/lib/helpers/playAudio';
import { cn } from '@/lib/helpers/utils';
import { useSignal } from '@preact/signals';
import { X } from 'lucide-preact';
import type { ComponentChildren } from 'preact';
import { createPortal, type FC } from 'preact/compat';
import { useEffect } from 'preact/hooks';

type FormStatusType = 'cancel' | 'confirm';

const ModalLayout: FC<{
    className?: string;
    children?: ComponentChildren;
}> = ({ className, children }) => {
    const { showModal } = useModal();
    const formStatus = useSignal<FormStatusType>('cancel');

    const closeModal = () => {
        playAudio('formFail');
        showModal.value = false;
    };
    useEscapeKey(closeModal);

    const isBrowser = typeof window !== 'undefined';

    const handleClick = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.id === 'email-form-modal') {
            closeModal();
        }
    };

    useEffect(() => {
        const handleStatusChange = (e: Event) => {
            const { detail } = e as CustomEvent<FormStatusType>;
            formStatus.value = detail;
            showModal.value = false;
        };

        window.addEventListener(events.CHANGE_FORM_STATUS, handleStatusChange);
        return () =>
            window.removeEventListener(
                events.CHANGE_FORM_STATUS,
                handleStatusChange,
            );
    }, []);

    useEffect(() => {
        if (!isBrowser) return;

        document.documentElement.style.overflowY = !showModal.value
            ? 'auto'
            : 'clip';

        return () => {
            document.documentElement.style.overflowY = 'auto';
        };
    }, [showModal.value]);

    if (!isBrowser) {
        return null;
    }

    return createPortal(
        <div
            onClick={handleClick}
            id="email-form-modal"
            class={cn(
                'size-screen fixed inset-0 z-20 flex flex-wrap overflow-y-auto bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out',
                {
                    'opacity-100': showModal.value,
                    'pointer-events-none opacity-0 delay-250': !showModal.value,
                    'delay-500':
                        formStatus.value === 'confirm' && !showModal.value,
                    'delay-250':
                        formStatus.value === 'cancel' && !showModal.value,
                },
            )}
        >
            <div
                class={cn(
                    'bg-user-background relative m-auto w-full rounded-sm',
                    {
                        'motion-safe:animate-slide-up': showModal.value,
                        'lg:motion-safe:animate-confirm-shrink-away motion-safe:animate-confirm-slide-down lg:origin-top-right':
                            formStatus.value === 'confirm' && !showModal.value,
                        'motion-safe:animate-cancel-blur-fall':
                            formStatus.value === 'cancel' && !showModal.value,
                    },

                    className,
                )}
            >
                <button
                    onClick={closeModal}
                    type="button"
                    class="absolute top-5 right-5 flex size-6 items-center justify-center sm:size-8"
                >
                    <span aria-hidden="true" class="absolute -inset-2" />
                    <X class="size-full" />
                </button>
                {children}
            </div>
        </div>,
        document.getElementById('portals')!,
    );
};

export default ModalLayout;
