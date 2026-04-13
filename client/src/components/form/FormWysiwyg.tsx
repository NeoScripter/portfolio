import { useFormContext } from '@/context/FormContext';
import InputError from './InputError';
import Label from './Label';
import MarkdownEditor from './MarkdownEditor';

type FormWysiwygProps = {
    name: string;
    label?: string;
    required?: boolean;
};

export const FormWysiwyg = ({
    name,
    label,
    required = false,
}: FormWysiwygProps) => {
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
            <MarkdownEditor
                value={(values[name] as string) ?? ''}
                onChange={(val) => {
                    handleChange(name, val);
                    handleBlur(name);
                }}
            />
            {hasError && <InputError message={errors[name]} />}
        </div>
    );
};
