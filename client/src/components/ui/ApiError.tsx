import Error from '@/assets/svgs/Error';
import { cn } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';
import type { FC } from 'preact/compat';

const ApiError: FC<{
    className?: string;
    mb?: boolean;
    mt?: boolean;
    resourceRu: string;
    resourceEn: string;
}> = ({ className, resourceRu, mb, mt, resourceEn }) => {
    const ruMessage = `<p>К сожалению, произошла ошибка загрузки ${resourceRu} :(</p> <p>Сервер сегодня в плохом настроении...</p>`,
        enMessage = `<p>Oops! Something went wrong while loading ${resourceEn} :(</p> <p>The server’s in a bad mood today...</p>`;

    const message = locale.value === 'ru' ? ruMessage : enMessage;
    return (
        <div
            class={cn(
                'border-muted-foreground mx-auto max-w-9/10 rounded-md border px-[2.75em] py-[1.5em] sm:max-w-3/4',
                mb && 'mb-14 sm:mb-22.5 lg:mb-27 xl:mb-26',
                mt && 'mt-14 sm:mt-22.5 lg:mt-27 xl:mt-26',
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
