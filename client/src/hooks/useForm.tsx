import {
    clearSessionSignal,
    createSessionSignal,
} from '@/signals/session-store';
import type { FormEvent } from 'preact/compat';
import { useCallback, useRef, useState } from 'preact/hooks';

type FormValues = Record<string, unknown>;
type FormErrors<T extends FormValues> = Partial<Record<keyof T, string>>;
type FormTouched<T extends FormValues> = Partial<Record<keyof T, boolean>>;

type ValidateFn<T extends FormValues> = (values: T) => FormErrors<T>;
type SubmitFn<T extends FormValues> = (values: T) => Promise<void> | void;

type ServerFieldErrors = Record<string, string>;

export type ServerError = {
    message?: string;
    errors?: ServerFieldErrors;
};

export const isServerError = (error: unknown): error is ServerError =>
    typeof error === 'object' &&
    error !== null &&
    ('message' in error || 'errors' in error);

export type UseFormReturn<T extends FormValues> = {
    values: T;
    errors: FormErrors<T>;
    touched: FormTouched<T>;
    isSubmitting: boolean;
    handleChange: (name: keyof T, value: unknown) => void;
    handleBlur: (name: keyof T) => void;
    handleSubmit: (e?: FormEvent) => Promise<void>;
    resetForm: () => void;
    setFormValues: (newValues: T) => void;
    setFieldValue: (name: keyof T, value: unknown) => void;
    setFieldError: (name: keyof T, error: string) => void;
    recentlySuccessful: boolean;
    hasBackup: boolean;
    handleRestoreBackup: () => void;
};

export const useForm = <T extends FormValues>(
    initialValues: T = {} as T,
    onSubmit: SubmitFn<T>,
    validate?: ValidateFn<T>,
): UseFormReturn<T> => {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<FormErrors<T>>({});
    const [touched, setTouched] = useState<FormTouched<T>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const backupKey = useRef(
        `form_backup_${JSON.stringify(Object.keys(initialValues))}`,
    );
    const backupSignal = useRef(
        createSessionSignal<T | null>(backupKey.current, null),
    );

    const [hasBackup, setHasBackup] = useState<boolean>(
        backupSignal.current.value !== null,
    );

    const handleRestoreBackup = useCallback(() => {
        const backup = backupSignal.current.value;
        if (backup != null) {
            setValues(backup);
        }
    }, []);

    const handleChange = useCallback(
        (name: keyof T, value: unknown) => {
            setValues((prev) => ({ ...prev, [name]: value }));
            if (errors[name]) {
                setErrors((prev) => ({ ...prev, [name]: undefined }));
            }
        },
        [errors],
    );

    const handleBlur = useCallback(
        (name: keyof T) => {
            setTouched((prev) => ({ ...prev, [name]: true }));
            if (validate) {
                const fieldErrors = validate({ ...values });
                if (fieldErrors[name]) {
                    setErrors((prev) => ({
                        ...prev,
                        [name]: fieldErrors[name],
                    }));
                }
            }
        },
        [values, validate],
    );

    const handleSubmit = useCallback(
        async (e?: FormEvent) => {
            e?.preventDefault();
            if (validate) {
                const validationErrors = validate(values);
                setErrors(validationErrors);
                if (Object.keys(validationErrors).length > 0) {
                    const allTouched = Object.keys(values).reduce<
                        FormTouched<T>
                    >((acc, key) => ({ ...acc, [key]: true }), {});
                    setTouched(allTouched);
                    return;
                }
            }
            setIsSubmitting(true);
            try {
                await onSubmit(values);

                clearSessionSignal(backupKey.current);
                backupSignal.current.value = null;
                setHasBackup(false);
                setRecentlySuccessful(true);

                setTimeout(() => setRecentlySuccessful(false), 3000);
            } catch (error) {
                if (isServerError(error)) {
                    console.error('Form submission error:', error);
                    if (error.errors) {
                        setErrors((prev) => ({ ...prev, ...error.errors }));
                        const serverTouched = Object.keys(error.errors).reduce<
                            FormTouched<T>
                        >((acc, key) => ({ ...acc, [key]: true }), {});
                        setTouched((prev) => ({ ...prev, ...serverTouched }));
                    }
                    if (error.message) {
                        console.error('Server error:', error.message);
                    }
                }
            } finally {
                setIsSubmitting(false);
            }
        },
        [values, validate, onSubmit],
    );

    const resetForm = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
        setRecentlySuccessful(false);
        clearSessionSignal(backupKey.current);
        backupSignal.current.value = null;
        setHasBackup(false);
    }, [initialValues]);

    const setFormValues = useCallback((newValues: T) => {
        setValues(newValues);
        backupSignal.current.value = newValues;
        setHasBackup(true);
    }, []);

    const setFieldValue = useCallback(
        (name: keyof T, value: unknown) => {
            handleChange(name, value);
        },
        [handleChange],
    );

    const setFieldError = useCallback((name: keyof T, error: string) => {
        setErrors((prev) => ({ ...prev, [name]: error }));
    }, []);

    return {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
        setFormValues,
        setFieldValue,
        setFieldError,
        recentlySuccessful,
        hasBackup,
        handleRestoreBackup,
    };
};
