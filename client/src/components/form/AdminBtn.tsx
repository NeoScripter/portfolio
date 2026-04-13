import { cn } from '@/lib/helpers/utils';
import { LoaderCircle } from 'lucide-preact';
import type { ComponentChildren } from 'preact';
import type { FC } from 'preact/compat';
import { AuthButton } from '../ui/AuthButton';

const AdminBtn: FC<{
    loading: boolean;
    className?: string;
    cancelLink?: string;
    children?: ComponentChildren;
}> = ({ className, loading, cancelLink, children }) => {
    return (
        <div class="flex items-center gap-2">
            <AuthButton
                type="submit"
                class={cn('w-fit', className)}
                disabled={loading}
            >
                {loading && <LoaderCircle class="h-4 w-4 animate-spin" />}
                Submit
            </AuthButton>
            {cancelLink && (
                <AuthButton href={cancelLink} variant="secondary">
                    Cancel
                </AuthButton>
            )}
            {children}
        </div>
    );
};

export default AdminBtn;
