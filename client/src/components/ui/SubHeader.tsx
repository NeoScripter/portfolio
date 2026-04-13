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
            <h3 className="mb-0.5 text-base font-medium">{title[lang]}</h3>
            {description && (
                <p className="text-muted-foreground text-sm">
                    {description[lang]}
                </p>
            )}
        </header>
    );
}
