import InputError from '@/components/form/InputError';
import Label from '@/components/form/Label';
import { useFormContext } from '@/context/FormContext';
import type { ServerError } from '@/hooks/useForm';
import { cn, range } from '@/lib/helpers/utils';
import type { CategoryType } from '@/lib/types/models/projects';
import type { NodeProps } from '@/lib/types/shared';
import type { FC } from 'preact/compat';

type Props = NodeProps & {
    locale: 'en' | 'ru';
    name: string;
    label: string;
    loading: boolean;
    errors: ServerError | null;
    categories: CategoryType[] | null;
};

const CategoryPicker: FC<Props> = ({
    className,
    locale,
    name,
    label,
    loading,
    errors,
    categories,
}) => {
    const {
        values,
        errors: formErrors,
        touched,
        handleChange,
    } = useFormContext();

    const hasError = touched[name] && formErrors[name];

    if (loading) {
        return <PickerFallback />;
    }

    if (errors) {
        console.error(errors);
        return null;
    }

    if (!categories || categories.length === 0) return null;

    return (
        <div className="grid gap-3">
            {label && <Label htmlFor={name}>{label}</Label>}
            <ul class={cn('flex flex-wrap gap-2', className)}>
                {categories.map((category) => (
                    <li>
                        <button
                            type="button"
                            key={category.id}
                            class={cn(
                                'hover:border-ring hover:ring-ring/50 border-foreground/20 rounded border px-3 py-1 transition-[color,box-shadow,border] hover:shadow-sm hover:ring-[3px]',
                                values[name] === category.id &&
                                    'border-indigo-700 text-indigo-700 hover:border-indigo-700',
                            )}
                            onClick={() => handleChange(name, category.id)}
                        >
                            {locale === 'en'
                                ? category.name.en
                                : category.name.ru}
                        </button>
                    </li>
                ))}
            </ul>
            {hasError && <InputError message={formErrors[name]} />}
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
