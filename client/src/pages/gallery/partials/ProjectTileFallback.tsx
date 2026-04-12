import { cn, range } from '@/lib/helpers/utils';
import type { NodeProps } from '@/lib/types/shared';
import type { FC } from 'preact/compat';

const ProjectTileFallback: FC<NodeProps> = ({ className }) => {
    return (
        <li
            className={cn(
                'px-4.5 pt-14.5 pb-16.5 md:-mx-4 md:px-12 md:pt-20.5 md:pb-20 lg:-mx-24 lg:flex lg:justify-between lg:gap-25.5 lg:px-28 lg:pt-18 lg:pb-18 2xl:px-48 2xl:pt-18 2xl:pb-18',
                className,
            )}
        >
            <div class="mb-12 md:flex md:items-start md:justify-between md:gap-15 lg:order-2 lg:mb-0 lg:block lg:max-w-1/2 lg:basis-full">
                <div className="skeleton aspect-square shrink-0 animate-pulse rounded-3xl md:order-2 md:max-w-2/5 lg:max-w-full" />
                <ProjectInfo className="lg:hidden" />
            </div>
            <div class="lg:flex lg:basis-2/5 lg:flex-col lg:items-start lg:justify-between 2xl:basis-1/2">
                <div class="lg:mb-10">
                    <ProjectInfo className="hidden lg:block" />
                </div>
                <div>
                    <p class="skeleton mb-12 animate-pulse rounded-sm lg:mb-7 xl:mb-13.5 xl:text-xl">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Perferendis dolores error expedita odio vitae.
                        Aliquam facere vel voluptas rerum et? Lorem ipsum dolor,
                        sit amet consectetur adipisicing elit. Perferendis
                        dolores error expedita odio vitae. Aliquam facere vel
                        voluptas rerum et?
                    </p>

                    <div class="skeleton ml-auto w-fit animate-pulse rounded-sm px-4 py-2 md:mr-auto lg:ml-0">
                        Перейти к проекту
                    </div>
                </div>
            </div>
        </li>
    );
};

export default ProjectTileFallback;

const ProjectInfo: FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={cn('mt-7 mb-17.5 md:mt-0 md:mb-0', className)}>
            <span class="skeleton mb-4 block w-fit animate-pulse rounded-sm uppercase">
                Lorem Lorem
            </span>
            <h2 class="skeleton mb-6 w-fit animate-pulse rounded-sm text-3xl font-semibold hyphens-auto md:mb-5 xl:text-4xl">
                lorem ipsum
            </h2>
            <ul class="flex flex-wrap gap-x-3 gap-y-3">
                {range(1, 5).map((stack) => (
                    <li
                        class="skeleton flex w-fit animate-pulse items-center justify-center rounded-sm px-3 py-1"
                        key={stack}
                    >
                        lorem
                    </li>
                ))}
            </ul>
        </div>
    );
};
