import CuteSearch from '@/assets/svgs/CuteSearch';
import { cn } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';
import type { FC } from 'preact/compat';

const EmptySearch: FC<{
    className?: string;
}> = ({ className }) => {
    const ruMessage = `<p>Увы, по вашему запросу ничего не найдено :(</p> <p>Попробуйте сократить запрос</p>`,
        enMessage = `<p>Alas, no search results have been found :(</p> <p>Perhaps, you can try to make your query a little shorter</p>`;

    const message = locale.value === 'ru' ? ruMessage : enMessage;
    return (
        <div
            class={cn(
                'border-muted-foreground mx-auto mt-16 mb-13 w-fit rounded-md border px-[2.75em] py-[1.5em] sm:my-19 sm:max-w-3/4 lg:mb-23',
                className,
            )}
        >
            <div aria-hidden="true" class="text-foreground/60 mb-6">
                <CuteSearch className="mx-auto size-14 md:size-20" />
            </div>
            <div
                class="text-center leading-[1.6em] text-balance"
                dangerouslySetInnerHTML={{ __html: message }}
            />
        </div>
    );
};

export default EmptySearch;
