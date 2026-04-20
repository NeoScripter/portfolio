import Placeholder from '@/assets/imgs/shared/placeholder.webp';
import { useFormContext } from '@/context/FormContext';
import { cn } from '@/lib/helpers/utils';
import { useEffect, useId, useState } from 'preact/hooks';
import InputError from './InputError';
import Label from './Label';
import UploadFileBtn from './UploadFileBtn';
import { PREFIX } from '@/lib/const/api';

type FormImageProps = {
    name: string;
    label?: string;
    src?: string;
    required?: boolean;
};

export const FormImage = ({
    name,
    label,
    src,
    required = false,
}: FormImageProps) => {
    const { errors, touched, handleChange, handleBlur, isSubmitting } =
        useFormContext();

    const hasError = touched[name] && errors[name];
    const id = useId();

    const [preview, setPreview] = useState(src);

    useEffect(() => {
        const resetImage = () => setPreview(src);
        document.addEventListener('media:clear', resetImage);
        return () => document.removeEventListener('media:clear', resetImage);
    }, [src]);

    const handleFile = (e: Event) => {
        const file = (e.target as HTMLInputElement).files?.[0] ?? null;
        if (!file) return;
        setPreview(URL.createObjectURL(file));
        handleChange(name, file);
        handleBlur(name);
    };

    return (
        <div className="grid gap-2">
            {label && (
                <Label htmlFor={id}>
                    {label}
                    {required && <span className="text-orange-500">*</span>}
                </Label>
            )}
            <div className="flex max-w-150 flex-col items-center justify-start gap-10 md:flex-row">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    className="mt-1 hidden"
                    id={id}
                    name={`image-input-${id}`}
                />
                <div className="shrink-0">
                    <UploadFileBtn
                        id={id}
                        label="Загрузить фото"
                        disabled={isSubmitting}
                    />
                </div>
                <div
                    className={cn(
                        'ease relative flex h-50 cursor-pointer items-center justify-center transition-transform duration-200 hover:scale-110',
                        hasError && 'outline-1 outline-red-400',
                    )}
                >
                    <img
                        src={preview ?? Placeholder}
                        alt="Preview"
                        className="h-full w-full rounded object-contain"
                    />
                </div>
            </div>
            <InputError message={errors[name]} />
        </div>
    );
};
