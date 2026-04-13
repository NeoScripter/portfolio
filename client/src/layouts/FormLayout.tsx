
import { AuthButton } from '@/components/ui/AuthButton';
import { cn } from '@/lib/helpers/utils';
import { Save } from 'lucide-preact';
import type { TargetedEvent } from 'preact';
import type { ComponentChildren } from 'preact';
import type { FC } from 'preact/compat';

interface FormLayoutProps {
    onSubmit: () => void | Promise<void>;
    children: ComponentChildren;
    className?: string;
    hasFileUpload?: boolean;
    handleBackupClick?: () => void;
}

const FormLayout: FC<FormLayoutProps> = ({
    onSubmit,
    children,
    className,
    hasFileUpload = false,
    handleBackupClick,
}) => {
    async function handleSubmit(e: TargetedEvent<HTMLFormElement, Event>) {
        e.preventDefault();
        await onSubmit();
    }

    return (
        <div>
            {handleBackupClick && (
                <AuthButton
                    onClick={handleBackupClick}
                    variant="default"
                    class="mb-6 pr-5!"
                >
                    <Save />
                    Restore
                </AuthButton>
            )}
            <form
                onSubmit={handleSubmit}
                className={cn('max-w-160 space-y-4', className)}
                {...(hasFileUpload && { encType: 'multipart/form-data' })}
            >
                {children}
            </form>
        </div>
    );
};

export default FormLayout;
