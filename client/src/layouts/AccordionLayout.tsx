import { AuthButton } from '@/components/ui/AuthButton';
import { cn } from '@/lib/helpers/utils';
import type { NodeProps } from '@/lib/types/shared';
import type { FC } from 'preact/compat';

const AccordionLayout: FC<
    NodeProps<{ label: string; show?: boolean; handleClick: () => void }>
> = ({ children, label, show = false, handleClick }) => {
    return (
        <div>
            <AuthButton class="w-35" variant="outline" onClick={handleClick}>
                {show ? 'Hide' : label}
            </AuthButton>
            <div
                inert={!show}
                class={cn(
                    'mt-4 grid transition-[grid-template-rows,padding] duration-500 ease-in-out',
                    show
                        ? 'border-input grid-rows-[1fr] rounded-md border p-4'
                        : 'grid-rows-[0fr]',
                )}
            >
                <div class="overflow-hidden">{children}</div>
            </div>
        </div>
    );
};

export default AccordionLayout;
