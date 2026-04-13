import { useFormContext } from '@/context/FormContext';
import { LoaderCircle } from 'lucide-preact';
import { AuthButton } from '../ui/AuthButton';

type FormButtonsProps = {
    submitText?: string;
    showReset?: boolean;
    resetText?: string;
    onCancel?: () => void;
    cancelLink?: string;
    successMessage?: string;
    cancelText?: string;
};

export const FormButtons = ({
    submitText = 'Submit',
    showReset = false,
    resetText = 'Reset',
    onCancel,
    cancelLink,
    successMessage = 'Saved',
    cancelText = 'Cancel',
}: FormButtonsProps) => {
    const { isSubmitting, resetForm, recentlySuccessful, handleRestoreBackup } =
        useFormContext();

    const label = isSubmitting
        ? 'Submitting...'
        : recentlySuccessful
          ? successMessage
          : submitText;

    return (
        <div className="flex gap-2.5">
            <AuthButton type="submit" disabled={isSubmitting}>
                {isSubmitting && <LoaderCircle class="h-4 w-4 animate-spin" />}
                {label}
            </AuthButton>

            {showReset && (
                <AuthButton onClick={resetForm} variant="secondary">
                    {resetText}
                </AuthButton>
            )}
            {onCancel ||
                (cancelLink && (
                    <AuthButton
                        href={cancelLink}
                        onClick={onCancel}
                        variant="secondary"
                    >
                        {cancelText}
                    </AuthButton>
                ))}
            <AuthButton type='button' onClick={handleRestoreBackup} disabled={isSubmitting}>
                Restore
            </AuthButton>
        </div>
    );
};
