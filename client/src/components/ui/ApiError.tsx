import Error from '@/assets/svgs/Error';
import { cn } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';
import type { FC } from 'preact/compat';

const ApiError: FC<{
    className?: string;
    resourceRu: string;
    resourceEn: string;
}> = ({ className, resourceRu, resourceEn }) => {
    const ruMessage = `<p>К сожалению, произошла ошибка загрузки ${resourceRu} :(</p> <p>Сервер сегодня в плохом настроении...</p>`,
        enMessage = `<p>Oops! Something went wrong while loading ${resourceEn} :(</p> <p>The server’s in a bad mood today...</p>`;

    const message = locale.value === 'ru' ? ruMessage : enMessage;
    return (
        <div
            class={cn(
                'border-muted-foreground mx-auto mt-16 mb-13 rounded-md border px-[0.75em] py-[1.5em] sm:my-19 sm:max-w-3/4 lg:mb-23',
                className,
            )}
        >
            <div aria-hidden="true" class="mb-5">
                <Error className="mx-auto size-14 md:size-20" />
            </div>
            <div
                class="text-center leading-[1.6em] text-balance"
                dangerouslySetInnerHTML={{ __html: message }}
            />
        </div>
    );
};

export default ApiError;
