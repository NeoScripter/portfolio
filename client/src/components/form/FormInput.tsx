import { useFormContext } from '@/context/FormContext';
import type { HTMLInputTypeAttribute } from 'preact';
import Input from './Input';
import InputError from './InputError';
import Label from './Label';

type FormInputProps = {
    name: string;
    label?: string;
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    required?: boolean;
};

export const FormInput = ({
    name,
    label,
    type = 'text',
    placeholder,
    required = false,
}: FormInputProps) => {
    const { values, errors, touched, handleChange, handleBlur } =
        useFormContext();
    const hasError = touched[name] && errors[name];

    console.log(touched[name]);
    console.log(errors[name]);

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
                onBlur={() => handleBlur(name)}
                placeholder={placeholder}
                aria-invalid={hasError ? 'true' : 'false'}
            />

            {hasError && <InputError message={errors[name]} />}
        </div>
    );
};
