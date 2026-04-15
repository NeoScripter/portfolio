import OneImageSplit from '@/assets/svgs/OneImageSplit';
import OnlyText, { type SVGIconProps } from '@/assets/svgs/OnlyText';
import TwoImageBlock from '@/assets/svgs/TwoImageBlock';
import TwoImageSplit from '@/assets/svgs/TwoImageSplit';
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
import type { FC, FunctionComponent } from 'preact/compat';

type LayoutPickerProps = NodeProps & {
    value: ModuleOptionType;
    onChange: (type: ModuleOptionType) => void;
    error?: string;
};

type LayoutOption = {
    type: ModuleOptionType;
    icon: FunctionComponent<SVGIconProps>;
};

const LayoutPicker: FC<LayoutPickerProps> = ({
    className,
    value,
    onChange,
    error,
}) => {
    const layouts: LayoutOption[] = [
        { type: 'only_text', icon: OnlyText },
        { type: 'two_image_split', icon: TwoImageSplit },
        { type: 'two_image_block', icon: TwoImageBlock },
        { type: 'one_image_split', icon: OneImageSplit },
    ];

    return (
        <div className={cn('grid gap-4', className)}>
            <label className="ml-1 text-base font-medium">Layout</label>

            <div className="grid grid-cols-4 gap-4">
                {layouts.map(({type, icon: Icon }) => (
                    <button
                        key={type}
                        type="button"
                        onClick={() => onChange(type)}
                        className={cn(
                            'group relative aspect-square overflow-hidden rounded-lg border-4 border-accent-foreground/80 transition-all',
                            value === type
                                ? 'ring-accent/50 ring-2'
                                : 'shadow-md opacity-25',
                        )}
                    >
                        <Icon className="size-full object-cover stroke-1 text-foreground" />

                        {/* Selected indicator */}
                        {value === type && (
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
