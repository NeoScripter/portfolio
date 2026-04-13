import type { UseFormReturn } from '@/hooks/useForm';
import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

export const FormContext = createContext<UseFormReturn<any> | null>(null);

export const useFormContext = <T extends Record<string, unknown>>() => {
    const context = useContext(FormContext) as UseFormReturn<T> | null;
    if (!context) {
        throw new Error('Form components must be used within a Form component');
    }
    return context;
};
