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
                'content-visibility-auto px-5 py-14 sm:px-15 sm:py-22.5 md:text-xl lg:px-23 lg:py-27 xl:py-26 2xl:text-[1.325rem]',
                className,
            )}
            style={style}
        >
            {children}
        </section>
    );
};

export default SectionLayout;
