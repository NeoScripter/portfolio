import { useFormContext } from '@/context/FormContext';
import type { HTMLInputTypeAttribute, InputHTMLAttributes } from 'preact';
import Input from './Input';
import InputError from './InputError';
import Label from './Label';

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label?: string;
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    required?: boolean;
    className?: string;
};

export const FormInput = ({
    name,
    label,
    type = 'text',
    placeholder,
    required = false,
    className,
    ...props
}: FormInputProps) => {
    const { values, errors, touched, handleChange, handleBlur } =
        useFormContext();
    const hasError = touched[name] && errors[name];

    return (
        <div className="grid gap-2">
            {label && (
                <Label htmlFor={name}>
                    {label}
                    {required && <span className="text-orange-500">*</span>}
                </Label>
            )}
            <Input
                id={name}
                name={name}
                type={type}
                value={(values[name] as string) ?? ''}
                onInput={(e) =>
                    handleChange(name, (e.target as HTMLInputElement).value)
                }
                class={className}
                onBlur={() => handleBlur(name)}
                placeholder={placeholder}
                aria-invalid={hasError ? 'true' : 'false'}
                {...props}
            />

            {hasError && <InputError message={errors[name]} />}
        </div>
    );
};
