import Input from '@/components/form/Input';
import InputError from '@/components/form/InputError';
import Label from '@/components/form/Label';
import { cn } from '@/lib/helpers/utils';
import type { FC } from 'preact/compat';
import { useId } from 'preact/hooks';

interface FormInputProps {
    label?: string;
    value: string;
    onInput: (value: string) => void;
    onKeyDown?: (e: KeyboardEvent) => void;
    error?: string;
    required?: boolean;
    className?: string;
}

const FormInput: FC<FormInputProps> = ({
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

export default FormInput;
