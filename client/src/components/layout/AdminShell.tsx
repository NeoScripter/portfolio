import { cn } from '@/lib/helpers/utils';
import type { NodeProps } from '@/lib/types/shared';
import type { FC } from 'preact/compat';

const AdminShell: FC<NodeProps> = ({ className, children }) => {
    return (
        <div
            className={cn(
                'flex h-full flex-1 flex-col gap-4 rounded-xl p-4',
                className,
            )}
        >
            {children}
        </div>
    );
};

export default AdminShell;
