import { useFormContext } from '@/context/FormContext';
import InputError from './InputError';
import Label from './Label';
import TextArea from './TextArea';

type FormTextAreaProps = {
    name: string;
    label?: string;
    placeholder?: string;
    rows?: number;
    required?: boolean;
};

export const FormTextArea = ({
    name,
    label,
    placeholder,
    rows = 4,
    required = false,
}: FormTextAreaProps) => {
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
            <TextArea
                id={name}
                name={name}
                value={(values[name] as string) ?? ''}
                onInput={(e) =>
                    handleChange(name, (e.target as HTMLInputElement).value)
                }
                onBlur={() => handleBlur(name)}
                placeholder={placeholder}
                rows={rows}
                aria-invalid={hasError ? 'true' : 'false'}
            />
            <InputError message={errors[name]} />
        </div>
    );
};
