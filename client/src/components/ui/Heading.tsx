import { cn } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';

export default function Heading({
    title,
    description,
    className
}: {
    title: string;
    description?: string;
    className?: string;
}) {
    const lang = locale.value === 'en' ? 'en' : 'ru';

    return (
        <div className={cn("mb-8 space-y-0.5", className)}>
            <h2
                key={`${lang}-primary-heading`}
                className="motion-safe:animate-fade-in text-xl font-semibold tracking-tight hyphens-auto"
            >
                {title}
            </h2>
            {description && (
                <p
                    key={`${lang}-primary-heading-description`}
                    className="text-muted-foreground motion-safe:animate-fade-in text-sm"
                >
                    {description}
                </p>
            )}
        </div>
    );
}
