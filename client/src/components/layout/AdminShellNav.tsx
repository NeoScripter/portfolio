import type { FC } from 'preact/compat';
import { Button } from '../ui/Button';

const AdminShellNav: FC<{ href: string }> = ({ href }) => {
    return (
        <nav class="mb-2">
            <Button
                class="h-9 rounded-sm text-sm"
                href={href}
                variant="primary"
            >
                Create New
            </Button>
        </nav>
    );
};

export default AdminShellNav;
