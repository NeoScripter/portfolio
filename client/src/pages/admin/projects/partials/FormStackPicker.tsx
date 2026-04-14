import { useFormContext } from '@/context/FormContext';
import StackPicker from './StackPicker';
import Label from '@/components/form/Label';
import InputError from '@/components/form/InputError';

type FormStackPickerProps = {
    name: string;
    label?: string;
    availableStacks: string[];
    loading?: boolean;
    required?: boolean;
};

export const FormStackPicker = ({
    name,
    label,
    availableStacks,
    loading = false,
    required = false,
}: FormStackPickerProps) => {
    const { values, errors, touched, handleChange, handleBlur } =
        useFormContext();

    const selected = (values[name] as string[]) ?? [];
    const hasError = touched[name] && errors[name];

    const handleAdd = (stack: string) => {
        handleChange(name, [...selected, stack]);
        handleBlur(name);
    };

    const handleRemove = (stack: string) => {
        handleChange(name, selected.filter((s) => s !== stack));
        handleBlur(name);
    };

    return (
        <div className="grid gap-2">
            {label && (
                <Label htmlFor={name}>
                    {label}
                    {required && <span className="text-orange-500">*</span>}
                </Label>
            )}
            <StackPicker
                selectedStacks={selected}
                availableStacks={availableStacks}
                onAdd={handleAdd}
                onRemove={handleRemove}
                loading={loading}
            />
            {hasError && <InputError message={errors[name]} />}
        </div>
    );
};
