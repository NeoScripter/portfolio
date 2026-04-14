import type { ServerError } from '@/hooks/useForm';
import { cn, range } from '@/lib/helpers/utils';
import type { CategoryType } from '@/lib/types/models/projects';
import type { NodeProps } from '@/lib/types/shared';
import type { FC } from 'preact/compat';

type Props = NodeProps & {
    locale: 'en' | 'ru';
    loading: boolean;
    errors: ServerError | null;
    categories: CategoryType[] | null;
    onSelect: (category: { en: string; ru: string }) => void;
    invalidId: number | null;
};

const CategoryPicker: FC<Props> = ({
    className,
    locale,
    onSelect,
    loading,
    errors,
    categories,
    invalidId,
}) => {
    if (loading) {
        return <PickerFallback />;
    }

    if (errors) {
        console.error(errors);
        return null;
    }

    if (!categories || categories.length === 0) return null;

    return (
        <div class={cn('flex flex-wrap gap-2', className)}>
            {categories.map((category) => (
                <button
                    type="button"
                    key={category.id}
                    class={cn(
                        'hover:border-ring hover:ring-ring/50 border-foreground/20 rounded border px-3 py-1 transition-[color,box-shadow,border] hover:shadow-sm hover:ring-[3px]',
                        invalidId === category.id &&
                            'border-red-600 text-red-600 hover:border-red-600',
                    )}
                    onClick={() =>
                        onSelect({
                            en: category.name.en,
                            ru: category.name.ru,
                        })
                    }
                >
                    {locale === 'en' ? category.name.en : category.name.ru}
                </button>
            ))}
        </div>
    );
};
export default CategoryPicker;

const PickerFallback = () => {
    return (
        <ul class="flex flex-wrap items-center gap-2">
            {' '}
            {range(0, 5).map((idx) => (
                <li key={idx} class="skeleton rounded border px-3 py-1">
                    loremipsu
                </li>
            ))}
        </ul>
    );
};
