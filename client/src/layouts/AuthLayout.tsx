import '@/assets/css/auth.css';
import AuthLogo from '@/components/ui/AuthLogo';
import { cn } from '@/lib/helpers/utils';
import { Toaster } from 'sonner';

interface AuthLayoutProps {
    title: string;
    description: string;
    children: preact.ComponentChildren;
    className?: string;
}

export default function AuthLayout({
    title,
    description,
    children,
    className,
    ...props
}: AuthLayoutProps) {
    return (
        <main
            className={cn(
                'bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10',
                className,
            )}
            {...props}
        >
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <a
                            href="/"
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                                <AuthLogo className="size-9 fill-current text-(--foreground) dark:text-white" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </a>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-muted-foreground text-center text-sm">
                                {description}
                            </p>
                        </div>
                    </div>

                    {children}
                </div>
            </div>
            <Toaster position="top-center" />
        </main>
    );
}
