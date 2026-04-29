import Monogram from '@/components/ui/Monogram';
import { useFetch } from '@/hooks/useFetch';
import { API_BASE_URL } from '@/lib/const/api';
import { cn } from '@/lib/helpers/utils';
import { currentUser } from '@/signals/auth';
import { hide } from '@/signals/sidebar-state';
import { LogOut, Settings } from 'lucide-preact';
import type { FC } from 'preact/compat';
import { toast } from 'sonner';
import SidebarLink from './SidebarLink';

const AccountMenu: FC<{ id: string; name: string; show: boolean }> = ({
    id,
    name,
    show,
}) => {
    const { fetchData } = useFetch();

    async function handleLogout() {
        await fetchData({
            url: `${API_BASE_URL}logout`,
            method: 'DELETE',
            onSuccess: () => {
                toast.success('See you later!');
            },
            onError: (err) => {
                console.error(err);
            },
        });
    }

    return (
        <div
            id={id}
            class={cn(
                'bg-background border-muted divide-muted absolute bottom-13 left-0 z-10 w-[max(100%,14rem)] origin-bottom-right divide-y border shadow-sm transition-[opacity,scale] md:rounded-lg',
                {
                    'pointer-events-none scale-90 opacity-0': !show,
                    'scale-100': show,
                },
            )}
        >
            <ul class="divide-muted divide-y">
                <li class="flex items-center gap-3 px-3 py-2">
                    <Monogram firstName={name} />
                    <div>
                        <div class="text-sm font-bold">{name}</div>
                        <div class="text-muted-foreground text-xs">
                            {currentUser.value?.email}
                        </div>
                    </div>
                </li>

                <SidebarLink
                    onClick={hide}
                    url="/admin/settings/profile"
                    icon={Settings}
                    label="Settings"
                    collapses={false}
                />
                <SidebarLink
                    onClick={handleLogout}
                    url="/login"
                    icon={LogOut}
                    label="Log out"
                    collapses={false}
                />
            </ul>
        </div>
    );
};

export default AccountMenu;
