import { useFormContext } from '@/context/FormContext';
import MockupPicker from './MockupPicker';
import Label from '@/components/form/Label';
import InputError from '@/components/form/InputError';

type FormMockupPickerProps = {
    name: string;
    label?: string;
    required?: boolean;
};

export const FormMockupPicker = ({
    name,
    label,
    required = false,
}: FormMockupPickerProps) => {
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
            <MockupPicker
                value={(values[name] as number) ?? null}
                onChange={(mockup) => {
                    handleChange(name, mockup);
                    handleBlur(name);
                }}
            />
            {hasError && <InputError message={errors[name]} />}
        </div>
    );
};
