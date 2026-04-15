import InputError from '@/components/form/InputError';
import { useFormContext } from '@/context/FormContext';
import type { ModuleOptionType } from '@/lib/types/models/module';
import type { FC } from 'preact/compat';
import LayoutPicker from './LayoutPicker';

type FormLayoutPickerProps = {
    name: string;
};

export const FormLayoutPicker: FC<FormLayoutPickerProps> = ({ name }) => {
    const { values, errors, touched, handleChange, handleBlur } =
        useFormContext();

    const hasError = touched[name] && errors[name];

    return (
        <>
            <LayoutPicker
                value={(values[name] as ModuleOptionType) ?? 'only_text'}
                onChange={(type) => {
                    handleChange(name, type);
                    handleBlur(name);
                }}
            />
            {hasError && <InputError message={errors[name]} />}
        </>
    );
};
