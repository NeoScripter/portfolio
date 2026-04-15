import type { FormValues } from '@/hooks/useForm';
import type { LocaleType } from '@/signals/locale';

const MIN_LENGTH = 4;
const MAX_LENGTH = 240;

type ValidationRule = 'required' | 'min' | 'max' | 'email';

export type ValidationRules<T extends FormValues> = Partial<
    Record<keyof T, ValidationRule[]>
>;

export function validate<T extends FormValues>(
    values: T,
    rules: ValidationRules<T>,
    locale: LocaleType | undefined = 'en',
): Partial<Record<keyof T, string>> {
    const errors: Partial<Record<keyof T, string>> = {};

    for (const [key, value] of Object.entries(values)) {
        const k = key as keyof T;

        if (!(k in rules)) {
            continue;
        }

        const validationRules = rules[k];

        if (!validationRules) {
            continue;
        }

        for (const rule of validationRules) {
            switch (rule) {
                case 'required':
                    if (isEmpty(value)) {
                        errors[k] =
                            locale === 'en'
                                ? 'This field is required'
                                : 'Данное поле обязательно к заполнению';
                    }
                    break;
                case 'min':
                    if (isShorterThan(value, MIN_LENGTH)) {
                        errors[k] =
                            locale === 'en'
                                ? `This field should be at least ${MIN_LENGTH} chars`
                                : `Данное поле должно содержать как минимум ${MIN_LENGTH} символов`;
                    }
                    break;
                case 'max':
                    if (isLongerThan(value, MAX_LENGTH)) {
                        errors[k] =
                            locale === 'en'
                                ? `This field should not be longer than ${MAX_LENGTH} chars`
                                : `Данное поле не должно содержать более ${MAX_LENGTH} символов`;
                    }
                    break;
                case 'email':
                    if (isInvalidEmail(value)) {
                        errors[k] =
                            locale === 'en'
                                ? 'Please enter a valid email'
                                : 'Пожалуйста, введите правильный адрес электронной почты';
                    }
                    break;
                default:
                    throw new Error('Unknown validation rule');
            }
        }
    }

    return errors;
}

export function isEmpty(value: unknown) {
    if (typeof value === 'string') {
        return value.trim().length === 0;
    }

    if (typeof value === 'number') {
        return value == null;
    }

    if (Array.isArray(value)) {
        return value.length === 0;
    }

    return value == null;
}

export function isShorterThan(value: unknown, limit: number) {
    if (typeof value === 'string') {
        return value.trim().length < limit;
    }

    return false;
}

export function isLongerThan(value: unknown, limit: number) {
    if (typeof value === 'string') {
        return value.trim().length > limit;
    }

    return false;
}

export function isInvalidEmail(value: unknown) {
    if (typeof value === 'string') {
        return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    }

    return false;
}
