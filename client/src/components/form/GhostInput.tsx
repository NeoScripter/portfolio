import { cn } from '@/lib/helpers/utils';
import type { InputHTMLAttributes } from 'preact';

type GhostInputProps = InputHTMLAttributes<HTMLInputElement> & {
    type?: string;
};

const GhostInput = ({
    class: className,
    type = 'text',
    ...props
}: GhostInputProps) => (
    <input
        type={type}
        data-slot="input"
        class={cn(
            'border-foreground/30 selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground flex h-9 w-full min-w-0 border-b bg-transparent py-1 text-sm shadow-xs transition-[color,box-shadow,border] outline-none placeholder:opacity-40 xl:text-base',
            'focus-visible:border-foreground focus-visible:border-b-1.5',
            'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
            className,
        )}
        {...props}
    />
);

export default GhostInput;
