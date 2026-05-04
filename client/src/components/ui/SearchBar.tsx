import { cn, getUpdatedUrl } from '@/lib/helpers/utils';
import type { NodeProps } from '@/lib/types/shared';
import { locale } from '@/signals/locale';
import { Search } from 'lucide-preact';
import { useLocation } from 'preact-iso';
import { useState, type ChangeEvent, type FC } from 'preact/compat';
import Input from '../form/Input';
import clickSound from '@/assets/audio/click.mp3';
import { playAudio } from '@/lib/helpers/playAudio';

const SearchBar: FC<NodeProps> = ({ className }) => {
    const { route, query } = useLocation();
    const [searchQuery, setSearchQuery] = useState(query?.search ? query?.search : '');

    const lang = locale.value === 'en' ? 'en' : 'ru';
    const placeholder =
        lang === 'en'
            ? 'Search by project name or stack'
            : 'Поиск по названию или стэку проекта';

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();

        const url = getUpdatedUrl([
            { name: 'search', val: searchQuery },
            { name: 'page', val: "1" },
        ]);
        route(url);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={cn(
                'mx-auto mb-16 flex max-w-9/10 flex-col items-center justify-between gap-x-11 gap-y-4.5 md:mb-25.5 md:max-w-160 md:flex-row lg:mb-20 xl:mb-24.5',
                className,
            )}
        >
            <Input
                class="border-primary/50 h-10"
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.currentTarget.value)
                }
            />

            <button
                type="submit"
                className="focus-visible:border-ring bg-foreground text-user-background hover:ring-footer-text focus-visible:ring-footer-text flex items-center justify-center gap-[0.5em] rounded-xl py-[0.5em] pr-[1em] pl-[1.5em] font-medium shadow-xs transition-[color,box-shadow,opacity] outline-none hover:ring-[3px] focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0"
                onClick={() => playAudio('click')}
            >
                <span
                    key={`${lang}-find-btn`}
                    className="motion-safe:animate-fade-in"
                >
                    Найти
                </span>
                <Search className="size-5" />
            </button>
        </form>
    );
};

export default SearchBar;
