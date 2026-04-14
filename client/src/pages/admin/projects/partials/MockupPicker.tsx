
import Mockup1 from '@/assets/imgs/mockups/mockup-1.webp';
import Mockup2 from '@/assets/imgs/mockups/mockup-2.webp';
import Mockup3 from '@/assets/imgs/mockups/mockup-3.webp';
import Mockup4 from '@/assets/imgs/mockups/mockup-4.webp';
import Mockup5 from '@/assets/imgs/mockups/mockup-5.webp';
import Mockup6 from '@/assets/imgs/mockups/mockup-6.webp';
import { cn } from '@/lib/helpers/utils';
import type { NodeProps } from '@/lib/types/shared';
import type { FC } from 'preact/compat';

type MockupPickerProps = NodeProps & {
    value: number;
    onChange: (selectedMockup: number) => void;
    error?: string;
};

type MockupOption = {
    id: number;
    img: string;
};

const MockupPicker: FC<MockupPickerProps> = ({
    className,
    value,
    onChange,
    error,
}) => {
    const mockups: MockupOption[] = [
        { id: 1, img: Mockup1 },
        { id: 2, img: Mockup2 },
        { id: 3, img: Mockup3 },
        { id: 4, img: Mockup4 },
        { id: 5, img: Mockup5 },
        { id: 6, img: Mockup6 },
    ];

    return (
        <div className={cn('grid gap-4', className)}>
            <div className="grid grid-cols-3 gap-4">
                {mockups.map((mockup) => (
                    <button
                        key={mockup.id}
                        type="button"
                        onClick={() => onChange(mockup.id)}
                        className={cn(
                            'group relative aspect-square overflow-hidden rounded-lg border-2 transition-all hover:scale-105',
                            value === mockup.id
                                ? 'border-accent ring-accent/50 ring-2'
                                : 'hover:border-accent/50 border-gray-300',
                        )}
                    >
                        <img
                            src={mockup.img}
                            alt={`Mockup ${mockup.id}`}
                            className="size-full object-cover"
                        />

                        {/* Overlay */}
                        <div
                            className={cn(
                                'absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity',
                                value === mockup.id
                                    ? 'opacity-0'
                                    : 'opacity-0 group-hover:opacity-100',
                            )}
                        >
                            <span className="text-5xl font-bold text-white">
                                {mockup.id}
                            </span>
                        </div>

                        {/* Selected indicator */}
                        {value === mockup.id && (
                            <div className="bg-muted/60 absolute top-2 right-2 flex size-12 items-center justify-center rounded-full text-white">
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

export default MockupPicker;
