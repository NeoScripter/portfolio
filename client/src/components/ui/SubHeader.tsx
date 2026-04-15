import type { PageTitleType } from '@/lib/types/shared';
import { locale } from '@/signals/locale';

export default function SubHeader({
    title,
    description,
}: {
    title: PageTitleType;
    description?: PageTitleType;
}) {
    const lang = locale.value === 'ru' ? 'ru' : 'en';

    return (
        <header>
            <h3
                key={`${lang}-subheader`}
                className="motion-safe:animate-fade-in mb-0.5 text-base font-medium hyphens-auto"
            >
                {title[lang]}
            </h3>
            {description && (
                <p
                    key={`${lang}-subheader-description`}
                    className="text-muted-foreground motion-safe:animate-fade-in text-sm"
                >
                    {description[lang]}
                </p>
            )}
        </header>
    );
}
