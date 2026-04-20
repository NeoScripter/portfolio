import { FormContext } from '@/context/FormContext';
import { useForm, type UseFormReturn } from '@/hooks/useForm';
import { cn } from '@/lib/helpers/utils';
import type { ValidationRules } from '@/lib/helpers/validation';
import { locale } from '@/signals/locale';
import type { ComponentChildren } from 'preact';

type FormValues = Record<string, unknown>;

type FormProps<T extends FormValues> = {
    initialValues?: T;
    onSubmit: (values: T) => Promise<void> | void;
    rules?: ValidationRules<T>;
    hasFile?: boolean;
    className?: string;
    children:
        | ComponentChildren
        | ((formState: UseFormReturn<T>) => ComponentChildren);
};

export const Form = <T extends FormValues>({
    initialValues = {} as T,
    onSubmit,
    className,
    rules,
    children,
    hasFile = false
}: FormProps<T>) => {
    const lang = locale.value === 'en' ? 'en' : 'ru';
    const formState = useForm<T>(initialValues, onSubmit, rules, lang);
    return (
        <FormContext.Provider value={formState}>
            <form
                onSubmit={formState.handleSubmit}
                className={cn('max-w-160', className)}
                noValidate
                {...(hasFile && { encType: 'multipart/form-data' })}
            >
                {typeof children === 'function'
                    ? children(formState)
                    : children}
            </form>
        </FormContext.Provider>
    );
};
