import { useFormContext } from '@/context/FormContext';
import InputError from './InputError';

type FormTextareaProps = {
    name: string;
    label?: string;
    placeholder?: string;
    rows?: number;
    required?: boolean;
};

export const FormTextarea = ({
    name,
    label,
    placeholder,
    rows = 4,
    required = false,
}: FormTextareaProps) => {
    const { values, errors, touched, handleChange, handleBlur } =
        useFormContext();
    const hasError = touched[name] && errors[name];
    return (
        <div className="flex gap-2">
            {label && (
                <label htmlFor={name} className="form-label">
                    {label}
                    {required && <span className="required">*</span>}
                </label>
            )}
            <textarea
                id={name}
                name={name}
                value={(values[name] as string) ?? ''}
                onInput={(e) =>
                    handleChange(name, (e.target as HTMLInputElement).value)
                }
                onBlur={() => handleBlur(name)}
                placeholder={placeholder}
                rows={rows}
                className="rounded border p-1"
                aria-invalid={hasError ? 'true' : 'false'}
            />
            {hasError && <InputError message={errors[name]} />}
        </div>
    );
};
