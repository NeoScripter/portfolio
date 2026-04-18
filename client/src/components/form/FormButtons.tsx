import { useFormContext } from '@/context/FormContext';
import { LoaderCircle, Save } from 'lucide-preact';
import { AuthButton } from '../ui/AuthButton';

type FormButtonsProps = {
    submitText?: string;
    showReset?: boolean;
    resetText?: string;
    onCancel?: () => void;
    cancelLink?: string;
    successMessage?: string;
    cancelText?: string;
    shouldBackup?: boolean;
    onDelete?: () => void;
};

export const FormButtons = ({
    submitText = 'Submit',
    showReset = false,
    resetText = 'Reset',
    onCancel,
    cancelLink,
    successMessage = 'Saved',
    cancelText = 'Cancel',
    shouldBackup = false,
    onDelete,
}: FormButtonsProps) => {
    const { isSubmitting, resetForm, recentlySuccessful, handleRestoreBackup } =
        useFormContext();

    const label = isSubmitting
        ? 'Submitting...'
        : recentlySuccessful
          ? successMessage
          : submitText;

    return (
        <div className="flex justify-between gap-2.5">
            <AuthButton key="submit-btn" type="submit" disabled={isSubmitting}>
                {isSubmitting && <LoaderCircle class="h-4 w-4 animate-spin" />}
                {label}
            </AuthButton>

            {showReset && (
                <AuthButton
                    key="reset-btn"
                    onClick={resetForm}
                    variant="secondary"
                >
                    {resetText}
                </AuthButton>
            )}
            {onCancel ||
                (cancelLink && (
                    <AuthButton
                        key="cancel-btn"
                        href={cancelLink}
                        onClick={onCancel}
                        variant="secondary"
                        class="mr-auto"
                    >
                        {cancelText}
                    </AuthButton>
                ))}
            {shouldBackup && (
                <AuthButton
                    key="delete-btn"
                    type="button"
                    onClick={handleRestoreBackup}
                    disabled={isSubmitting}
                >
                    <Save />
                    Restore
                </AuthButton>
            )}
            {onDelete && (
                <AuthButton
                    type="button"
                    onClick={onDelete}
                    variant="destructive"
                >
                    Delete
                </AuthButton>
            )}
        </div>
    );
};
