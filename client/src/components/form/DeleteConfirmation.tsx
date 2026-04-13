import { cn } from '@/lib/helpers/utils';
import type { FC } from 'preact/compat';
import { AuthButton } from '../ui/AuthButton';

interface DeleteConfirmationProps {
    itemName: string;
    onCancel: () => void;
    loading: boolean;
    className?: string;
}

const DeleteConfirmation: FC<DeleteConfirmationProps> = ({
    itemName,
    onCancel,
    loading,
    className,
}) => {
    return (
        <div className={cn('space-y-6', className)}>
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Delete {itemName}</h2>
                <p className="text-muted-foreground">
                    Are you sure you want to delete this{' '}
                    {itemName.toLowerCase()}? This action cannot be undone.
                </p>
            </div>
            <div className="flex items-center justify-end gap-4">
                <AuthButton
                    key="delete"
                    type="submit"
                    class="w-fit text-base"
                    disabled={loading}
                    variant="destructive"
                    size="lg"
                >
                    {loading ? 'Deleting...' : 'Delete'}
                </AuthButton>
                <AuthButton
                    key="cancel"
                    onClick={onCancel}
                    type="button"
                    variant="default"
                    class="w-fit text-base"
                    size="lg"
                >
                    Cancel
                </AuthButton>
            </div>
        </div>
    );
};

export default DeleteConfirmation;
