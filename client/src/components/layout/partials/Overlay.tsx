import { cn } from '@/lib/helpers/utils';
import { createPortal, type FC } from 'preact/compat';

const Overlay: FC<{ show: boolean }> = ({ show }) => {
    return createPortal(
        <div
            aria-hidden="true"
            class={cn(
                'size-screen fixed inset-0 backdrop-blur-sm transition-opacity duration-300 ease-in-out lg:hidden',
                {
                    'opacity-100': show,
                    'pointer-events-none opacity-0': !show,
                }
            )}
        />,
        document.getElementById('portals')!
    );
};

export default Overlay;
