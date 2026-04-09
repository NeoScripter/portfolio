import getHeaderVariant from '@/lib/helpers/getHeaderVariant';
import { cn } from '@/lib/helpers/utils';
import { useRoute } from 'preact-iso';
import type { FC } from 'preact/compat';

const BurgerMenu: FC<{
    className?: string;
    onClick: () => void;
    show: boolean;
}> = ({ className, onClick, show }) => {
    const { path } = useRoute();
    const variant = getHeaderVariant(path);

    return (
        <button
            onClick={onClick}
            id="burger-menu"
            class={cn(
                'size-9 transition-transform duration-300 ease-in',
                {
                    'scale-100': !show,
                    'text-white': variant === 'primary',
                    'scale-50 text-gray-400 sm:translate-x-8 sm:-translate-y-3':
                        show,
                },
                className
            )}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 36 36"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                class={cn(
                    'lucide lucide-menu-icon lucide-menu overflow-visible'
                )}
            >
                <path
                    class={cn(
                        'burger',
                        show
                            ? 'burger-open rotate-45'
                            : 'burger-close -translate-y-[9px]'
                    )}
                    d="M0 18h36"
                />
                <path
                    class={cn(
                        'transition-opacity duration-300 ease-in',
                        show && 'opacity-0'
                    )}
                    d="M0 18h36"
                />
                <path
                    class={cn(
                        'burger',
                        show
                            ? 'burger-open -rotate-45'
                            : 'burger-close translate-y-[9px]'
                    )}
                    d="M0 18h36"
                />
            </svg>
        </button>
    );
};

export default BurgerMenu;
