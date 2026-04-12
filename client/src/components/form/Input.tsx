import { cn } from '@/lib/helpers/utils';
import type { InputHTMLAttributes } from 'preact';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    type?: string;
};

const Input = ({ class: className, type = 'text', ...props }: InputProps) => (
    <input
        type={type}
        data-slot="input"
        class={cn(
            'border-input selection:bg-primary selection:text-primary-foreground file:text-foreground placeholder:text-muted-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[border,color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
            className,
        )}
        {...props}
    />
);

export default Input;
