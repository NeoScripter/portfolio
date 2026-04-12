import Error from '@/assets/svgs/Error';
import ErrorCode from '@/assets/svgs/error-code';
import PrimaryLink from '@/components/ui/PrimaryLink';
import AppLayout from '@/layouts/AppLayout';
import AppSection from '@/layouts/SectionLayout';

const NotFound = () => {
    return (
        <AppLayout>
            <AppSection className="relative isolate overflow-clip text-center text-balance [&>*]:mx-auto">
                <div class="mt-24 mb-4 w-[80vw] max-w-90 sm:mb-10">
                    <ErrorCode className="size-full" />
                </div>
                <div class="w-3/5 max-w-56">
                    <Error className="w-full" />
                </div>

                <h1 class="mt-11 mb-5 text-xl font-bold sm:mb-11 sm:text-4xl xl:text-5xl">
                    Упс! Страница не найдена(
                </h1>
                <p class="max-w-200 sm:text-xl xl:text-2xl">
                    Что-то пошло не так. Возможно, эта страница была перемещена
                    или удалена
                </p>

                <PrimaryLink
                    className="mt-9 mb-25 w-fit sm:mt-12 xl:mt-13"
                    href="/"
                >
                    На главную
                </PrimaryLink>
            </AppSection>
        </AppLayout>
    );
};

export default NotFound;
