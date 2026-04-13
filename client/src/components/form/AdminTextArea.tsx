import { cn } from '@/lib/helpers/utils';
import { type FC, useId } from 'preact/compat';
import Label from './Label';
import TextArea from './TextArea';
import InputError from './InputError';

interface AdminTextAreaProps {
    label: string;
    value: string;
    onInput: (value: string) => void;
    error?: string;
    required?: boolean;
    className?: string;
}

const AdminTextArea: FC<AdminTextAreaProps> = ({
    label,
    value,
    onInput,
    error,
    required = false,
    className,
}) => {
    const id = useId();

    return (
        <div class={cn('grid gap-2', className)}>
            <Label class="ml-1 text-base" htmlFor={id}>
                {label}
            </Label>
            <TextArea
                id={id}
                required={required}
                class="text-base!"
                value={value}
                onInput={(e) => {
                    onInput((e.target as HTMLTextAreaElement).value);
                }}
            />
            <InputError class="ml-1 text-base" message={error || ''} />
        </div>
    );
};

export default AdminTextArea;
