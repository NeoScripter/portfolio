import Input from '@/components/form/Input';
import { cn, getUpdatedUrl } from '@/lib/helpers/utils';
import type { NodeProps } from '@/lib/types/shared';
import { Search } from 'lucide-preact';
import type { TargetedEvent } from 'preact';
import { useLocation } from 'preact-iso';
import { type FC } from 'preact/compat';

const SearchBox: FC<NodeProps> = ({ className }) => {
    const { route, query } = useLocation();
    const search = query?.search == null ? '' : query.search;

    const handleChange = (newValue: string) => {
        const url = getUpdatedUrl([
            { name: 'search', val: newValue },
            { name: 'page', val: '1' },
        ]);
        route(url);
    };

    return (
        <div className={cn('relative flex max-w-110', className)}>
            <Input
                class="border-primary/50 h-9 rounded-[2px]! text-base!"
                type="search"
                value={search}
                placeholder="Search..."
                onInput={(e: TargetedEvent<HTMLInputElement>) =>
                    handleChange(e.currentTarget.value)
                }
            />
            <Search className="text-muted-foreground absolute top-1/2 right-2.5 size-5 -translate-y-1/2" />
        </div>
    );
};

export default SearchBox;
