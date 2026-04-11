import { useModal } from '@/context/ModalContext';
import { cn } from '@/lib/helpers/utils';
import type { ComponentChildren, CSSProperties } from 'preact';
import type { FC } from 'preact/compat';

const SectionLayout: FC<{
    className?: string;
    children: ComponentChildren;
    style?: CSSProperties;
}> = ({ className, children, style }) => {
    const { showModal } = useModal();

    return (
        <section
            inert={showModal.value}
            class={cn(
                'content-vis-auto px-5 sm:px-15 md:text-xl lg:px-23 2xl:text-2xl',
                className,
            )}
            style={style}
        >
            {children}
        </section>
    );
};

export default SectionLayout;
