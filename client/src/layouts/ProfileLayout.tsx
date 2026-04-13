
import { AuthButton } from '@/components/ui/AuthButton';
import Heading from '@/components/ui/Heading';
import { cn } from '@/lib/helpers/utils';
import type { ComponentChildren } from 'preact';

const sidebarNavItems = [
    {
        title: 'Profile',
        href: '/admin/settings/profile',
        icon: null,
    },
    {
        title: 'Password',
        href: '/admin/settings/password',
        icon: null,
    },
    {
        title: 'Appearance',
        href: '/admin/settings/appearance',
        icon: null,
    },
];

type ProfileLayoutProps = {
    children: ComponentChildren;
};

export default function ProfileLayout({ children }: ProfileLayoutProps) {
    const currentPath = window.location.pathname;

    return (
        <div className="px-4 py-6">
            <Heading title="Profile" description="Manage your profile and account settings" />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {sidebarNavItems.map((item) => (
                            <AuthButton
                                tabindex={-1}
                                key={item.href}
                                size="sm"
                                variant="ghost"
                                class={cn('relative w-full justify-start', {
                                    'bg-muted': currentPath === item.href,
                                })}
                            >
                                <a href={item.href} class="absolute inset-0 z-10" />
                                {item.title}
                            </AuthButton>
                        ))}
                    </nav>
                </aside>

                <hr className="my-6 xl:hidden" />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
