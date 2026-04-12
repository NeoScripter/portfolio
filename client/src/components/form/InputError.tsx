import { cn } from '@/lib/helpers/utils';
import type { HTMLAttributes } from 'preact';

interface InputErrorProps extends HTMLAttributes<HTMLParagraphElement> {
    message?: string;
}

const InputError = ({
    message,
    class: className = '',
    ...props
}: InputErrorProps) => {
    if (!message) return null;

    return (
        <p
            {...props}
            class={cn(
                'text-xs font-medium text-red-600 xl:text-sm dark:text-red-400',
                className,
            )}
        >
            {message}
        </p>
    );
};

export default InputError;
