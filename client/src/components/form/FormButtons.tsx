import { useFormContext } from '@/context/FormContext';
import { LoaderCircle } from 'lucide-preact';
import { AuthButton } from '../ui/AuthButton';

interface FormButtonsProps {
    submitText?: string;
    showReset?: boolean;
    resetText?: string;
    onCancel?: () => void;
    cancelText?: string;
}

export const FormButtons = ({
    submitText = 'Submit',
    showReset = false,
    resetText = 'Reset',
    onCancel,
    cancelText = 'Cancel',
}: FormButtonsProps) => {
    const { isSubmitting, resetForm } = useFormContext();

    return (
        <div className="flex gap-1.5">
            <AuthButton
                type="submit"
                class="mt-4 w-full"
                disabled={isSubmitting}
            >
                {isSubmitting && <LoaderCircle class="h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Submitting...' : submitText}
            </AuthButton>

            {showReset && (
                <button
                    type="button"
                    className="cursor-pointer rounded bg-gray-200 p-1 text-black"
                    onClick={resetForm}
                    disabled={isSubmitting}
                >
                    {resetText}
                </button>
            )}
            {onCancel && (
                <button
                    type="button"
                    className="cursor-pointer rounded bg-red-500 p-1"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    {cancelText}
                </button>
            )}
        </div>
    );
};
