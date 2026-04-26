import { AuthButton } from '@/components/ui/AuthButton';
import { cn } from '@/lib/helpers/utils';
import type { NodeProps } from '@/lib/types/shared';
import type { FC } from 'preact/compat';
import { useState } from 'preact/hooks';
import FormInput from './FormInput';
import StackTags from './StackTags';

type StackPickerProps = NodeProps & {
    selectedStacks: string[];
    availableStacks: string[];
    onAdd: (stack: string) => void;
    onError: (stack: string) => void;
    isError: boolean;
    onRemove: (stack: string) => void;
    loading?: boolean;
    errors?: string;
    label?: string;
};

const StackPicker: FC<StackPickerProps> = ({
    className,
    selectedStacks,
    availableStacks,
    onAdd,
    onRemove,
    onError,
    loading = false,
    label,
    isError,
    errors,
}) => {
    const [searchValue, setSearchValue] = useState('');

    const handleAdd = () => {
        if (searchValue.trim() === '') {
            return;
        }
        if (
            availableStacks
                .map((t) => t.toLowerCase())
                .includes(searchValue.trim().toLowerCase()) ||
            selectedStacks
                .map((t) => t.toLowerCase())
                .includes(searchValue.trim().toLowerCase())
        ) {
            onError('This tag is already on the list');
            setTimeout(() => onError(''), 4000);
            return;
        }
        onAdd(searchValue.trim());
        setSearchValue('');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd();
        }
    };

    return (
        <div className={className}>
            {label && (
                <label className="mb-2 ml-1 block text-base font-medium">
                    {label}
                </label>
            )}
            <div className="border-input grid gap-3 rounded-md border p-3">
                <StackTags
                    key="selected"
                    onClick={onRemove}
                    stacks={selectedStacks}
                />
                <div class="flex items-center gap-2">
                    <FormInput
                        key="stack-search"
                        value={searchValue}
                        onInput={setSearchValue}
                        onKeyDown={handleKeyDown}
                        className={cn(
                            isError &&
                                '[&_input]:border-red-500 [&_input]:text-red-500 [&_input]:focus-visible:border-red-500 [$_input]:text-sm',
                        )}
                        error={errors}
                    />
                    <AuthButton
                        type="button"
                        onClick={handleAdd}
                        variant="default"
                    >
                        Add
                    </AuthButton>
                </div>
                <StackTags
                    key="available"
                    onClick={(value) => {
                        onAdd(value);
                        setSearchValue('');
                    }}
                    stacks={availableStacks}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default StackPicker;
