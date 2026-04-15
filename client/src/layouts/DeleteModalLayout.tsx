
import { useDeleteModal } from '@/context/DeleteModelContext';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { cn } from '@/lib/helpers/utils';
import type { ComponentChildren } from 'preact';
import { createPortal, type FC } from 'preact/compat';
import { useEffect } from 'preact/hooks';

const DeleteModalLayout: FC<{
    className?: string;
    children?: ComponentChildren;
}> = ({ className, children }) => {
    const { itemToDelete } = useDeleteModal();

    useEscapeKey(() => (itemToDelete.value = null));

    const handleClick = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.id === 'email-form-modal') {
            itemToDelete.value = null;
        }
    };

    useEffect(() => {
        document.documentElement.style.overflowY =
            itemToDelete.value == null ? 'auto' : 'clip';

        return () => {
            document.documentElement.style.overflowY = 'auto';
        };
    }, [itemToDelete.value]);

    return createPortal(
        <div
            onClick={handleClick}
            id="email-form-modal"
            class={cn(
                'size-screen fixed inset-0 z-20 flex flex-wrap overflow-y-auto bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out',
                {
                    'opacity-100': itemToDelete.value,
                    'pointer-events-none opacity-0': itemToDelete.value == null,
                },
            )}
        >
            <div
                class={cn(
                    'bg-user-background m-auto w-full rounded-sm max-w-9/10 px-7 py-10 sm:max-w-100 lg:max-w-160',
                    {
                        'animate-shrink': itemToDelete.value == null,
                        'animate-expand': itemToDelete.value,
                    },
                    className,
                )}
            >
                {children}
            </div>
        </div>,
        document.getElementById('portals')!,
    );
};

export default DeleteModalLayout;
