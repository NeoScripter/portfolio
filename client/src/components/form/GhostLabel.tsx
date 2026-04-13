import { cn } from '@/lib/helpers/utils';
import type { LabelHTMLAttributes } from 'preact';

type GhostLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

const GhostLabel = ({ class: className, ...props }: GhostLabelProps) => (
    <label
        data-slot="label"
        class={cn(
            'text-foreground/50 group-hover:text-foreground group-focus-within:text-foreground text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 xl:text-base',
            className,
        )}
        {...props}
    />
);

export default GhostLabel;
