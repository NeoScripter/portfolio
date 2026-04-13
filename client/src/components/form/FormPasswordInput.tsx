import { useFormContext } from '@/context/FormContext';
import InputError from './InputError';
import Label from './Label';
import PasswordInput from './PasswordInput';

type FormPasswordInputProps = {
    name: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
};

export const FormPasswordInput = ({
    name,
    label,
    placeholder,
    required = false,
}: FormPasswordInputProps) => {
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
            <PasswordInput
                id={name}
                name={name}
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
