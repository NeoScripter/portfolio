import { cn } from '@/lib/helpers/utils';
import type { ModuleOptionType } from '@/lib/types/models/module';
import type { NodeProps } from '@/lib/types/shared';
import {
    LayoutPanelLeft,
    LayoutPanelTop,
    type LucideIcon,
    PanelLeft,
    Rows2,
} from 'lucide-preact';
import type { FC } from 'preact/compat';

type LayoutPickerProps = NodeProps & {
    value: ModuleOptionType;
    onChange: (type: ModuleOptionType) => void;
    error?: string;
};

type LayoutOption = {
    type: ModuleOptionType;
    icon: LucideIcon;
};

const LayoutPicker: FC<LayoutPickerProps> = ({
    className,
    value,
    onChange,
    error,
}) => {
    const layouts: LayoutOption[] = [
        { type: 'only_text', icon: Rows2 },
        { type: 'two_image_split', icon: LayoutPanelLeft },
        { type: 'two_image_block', icon: LayoutPanelTop },
        { type: 'one_image_split', icon: PanelLeft },
    ];

    return (
        <div className={cn('grid gap-4', className)}>
            <label className="ml-1 text-base font-medium">Layout</label>

            <div className="grid grid-cols-4 gap-4">
                {layouts.map((layout) => (
                    <button
                        key={layout}
                        type="button"
                        onClick={() => onChange(layout.type)}
                        className={cn(
                            'group relative aspect-square overflow-hidden rounded-lg border-4 border-accent-foreground/80 transition-all',
                            value === layout.type
                                ? 'ring-accent/50 ring-2'
                                : 'shadow-md',
                        )}
                    >
                        <layout.icon className="size-full object-cover stroke-1 text-accent-foreground/80" />

                        {/* Overlay */}
                        <div
                            className={cn(
                                'absolute hidden inset-0 items-center justify-center bg-black/20 transition-opacity',
                                value === layout.type
                                    ? 'opacity-0'
                                    : 'opacity-0 group-hover:opacity-100',
                            )}
                        >
                            <span className="text-5xl font-bold text-white">
                                {layout}
                            </span>
                        </div>

                        {/* Selected indicator */}
                        {value === layout.type && (
                            <div className="bg-accent-foreground/60 absolute top-2 right-2 flex size-12 items-center justify-center rounded-full text-white">
                                <svg
                                    className="size-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {error && <p className="ml-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default LayoutPicker;
