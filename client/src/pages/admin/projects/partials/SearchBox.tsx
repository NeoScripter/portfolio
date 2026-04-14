
import Input from '@/components/form/Input';
import { cn } from '@/lib/helpers/utils';
import type { NodeProps } from '@/lib/types/shared';
import type { ChangeEvent, FC } from 'preact/compat';

const SearchBox: FC<
    NodeProps<{ value: string; handleChange: (val: string) => void }>
> = ({ className, value, handleChange }) => {
    return (
        <div className={cn('mb-3 ml-4 flex max-w-100', className)}>
            <Input
                class="border-primary/50 h-10 text-lg!"
                type="search"
                value={value}
                placeholder="Enter project name"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(e.currentTarget.value)
                }
            />
        </div>
    );
};

export default SearchBox;
