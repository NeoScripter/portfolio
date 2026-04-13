import { FormContext } from '@/context/FormContext';
import { useForm, type UseFormReturn } from '@/hooks/useForm';
import { cn } from '@/lib/helpers/utils';
import type { ComponentChildren } from 'preact';

type FormValues = Record<string, unknown>;

type FormProps<T extends FormValues> = {
    initialValues?: T;
    onSubmit: (values: T) => Promise<void> | void;
    validate?: (values: T) => Partial<Record<keyof T, string>>;
    className?: string;
    children:
        | ComponentChildren
        | ((formState: UseFormReturn<T>) => ComponentChildren);
};

export const Form = <T extends FormValues>({
    initialValues = {} as T,
    onSubmit,
    className,
    validate,
    children,
}: FormProps<T>) => {
    const formState = useForm<T>(initialValues, onSubmit, validate);
    return (
        <FormContext.Provider value={formState}>
            <form
                onSubmit={formState.handleSubmit}
                className={cn('max-w-160', className)}
                noValidate
            >
                {typeof children === 'function'
                    ? children(formState)
                    : children}
            </form>
        </FormContext.Provider>
    );
};
