import Input from '@/components/form/Input';
import { cn } from '@/lib/helpers/utils';
import type { NodeProps } from '@/lib/types/shared';
import { Search } from 'lucide-preact';
import type { ChangeEvent, FC } from 'preact/compat';

const SearchBox: FC<
    NodeProps<{ value: string; handleChange: (val: string) => void }>
> = ({ className, value, handleChange }) => {
    return (
        <div className={cn('relative flex max-w-110', className)}>
            <Input
                class="border-primary/50 h-9 rounded-[2px]! text-base!"
                type="search"
                value={value}
                placeholder="Search..."
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(e.currentTarget.value)
                }
            />
            <Search className="text-muted-foreground absolute top-1/2 right-2.5 size-5 -translate-y-1/2" />
        </div>
    );
};

export default SearchBox;
