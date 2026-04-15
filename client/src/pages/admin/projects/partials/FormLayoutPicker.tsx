import InputError from '@/components/form/InputError';
import Label from '@/components/form/Label';
import { useFormContext } from '@/context/FormContext';
import type { ModuleOptionType } from '@/lib/types/models/module';
import type { FC } from 'preact/compat';
import LayoutPicker from './LayoutPicker';

type FormLayoutPickerProps = {
    name: string;
    label?: string;
    required?: boolean;
};

export const FormLayoutPicker: FC<FormLayoutPickerProps> = ({
    name,
    label,
    required = false,
}) => {
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

            <LayoutPicker
                value={(values[name] as ModuleOptionType) ?? 'only_text'}
                onChange={(type) => {
                    handleChange(name, type);
                    handleBlur(name);
                }}
            />
            {hasError && <InputError message={errors[name]} />}
        </div>
    );
};
