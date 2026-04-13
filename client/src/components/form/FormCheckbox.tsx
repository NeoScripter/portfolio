import { useFormContext } from '@/context/FormContext';
import Checkbox from './Checkbox';
import InputError from './InputError';
import Label from './Label';

type FormCheckboxProps = {
    name: string;
    label?: string;
    required?: boolean;
};

export const FormCheckbox = ({
    name,
    label,
    required = false,
}: FormCheckboxProps) => {
    const { values, errors, touched, handleChange, handleBlur } =
        useFormContext();
    const hasError = touched[name] && errors[name];

    return (
        <div className="flex items-center gap-3">
            <Checkbox
                id={name}
                name={name}
                checked={(values[name] as boolean) ?? false}
                onClick={() => handleChange(name, !values[name])}
                onBlur={() => handleBlur(name)}
            />
            {label && (
                <Label htmlFor={name}>
                    {label}
                    {required && <span className="text-orange-500">*</span>}
                </Label>
            )}
            {hasError && <InputError message={errors[name]} />}
        </div>
    );
};
