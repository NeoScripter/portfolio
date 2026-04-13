import { cn } from '@/lib/helpers/utils';
import { type FC, useId } from 'preact/compat';
import Label from './Label';
import Input from './Input';
import InputError from './InputError';

interface AdminInputProps {
    label?: string;
    value: string;
    onInput: (value: string) => void;
    onKeyDown?: (e: KeyboardEvent) => void;
    error?: string;
    required?: boolean;
    className?: string;
}

const AdminInput: FC<AdminInputProps> = ({
    label,
    value,
    onInput,
    error,
    onKeyDown,
    required = false,
    className,
}) => {
    const id = useId();

    return (
        <div class={cn('grid gap-2', className)}>
            {label && (
                <Label class="ml-1 text-base" htmlFor={id}>
                    {label}
                </Label>
            )}
            <Input
                id={id}
                required={required}
                class="text-base!"
                value={value}
                onInput={(e) => {
                    onInput((e.target as HTMLTextAreaElement).value);
                }}
                onKeyDown={onKeyDown}
            />
            <InputError class="ml-1 text-base" message={error || ''} />
        </div>
    );
};

export default AdminInput;
