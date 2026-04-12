import AdaptiveImg from '@/components/ui/AdaptiveImg';
import Badge from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/helpers/utils';
import type { ProjectType } from '@/lib/types/models/projects';
import type { NodeProps } from '@/lib/types/shared';
import { locale } from '@/signals/locale';
import type { FC } from 'preact/compat';

const ProjectTile: FC<NodeProps<{ project: ProjectType }>> = ({
    className,
    project,
}) => {
    const lang = locale.value === 'en' ? 'en' : 'ru';
    const img = project.image;

    return (
        <li
            className={cn(
                'px-4.5 pt-14.5 pb-16.5 md:-mx-4 md:px-12 md:pt-20.5 md:pb-20 lg:flex lg:justify-between lg:gap-25.5 lg:px-28 lg:pt-18 lg:pb-18 2xl:px-48 2xl:pt-18 2xl:pb-18',
                className,
            )}
        >
            <div class="mb-12 md:flex md:items-start md:justify-between md:gap-15 lg:order-2 lg:mb-0 lg:block lg:max-w-1/2 lg:basis-full">
                {img && (
                    <AdaptiveImg
                        prtClass="rounded-3xl md:max-w-2/5 md:order-2 lg:max-w-full"
                        alt={project.image?.alt?.[lang]}
                        srcs={img.srcSet}
                    />
                )}
                <ProjectInfo project={project} className="lg:hidden" />
            </div>
            <div class="lg:flex lg:basis-2/5 lg:flex-col lg:items-start lg:justify-between 2xl:basis-1/2">
                <div class="lg:mb-10">
                    <ProjectInfo
                        className="hidden lg:block"
                        project={project}
                    />
                </div>
                <div>
                    <p class="mb-12 lg:mb-7 xl:mb-13.5 xl:text-xl">
                        {project.attr.description[lang]}
                    </p>

                    <Button
                        class="ml-auto md:mr-auto lg:ml-0"
                        href={project.attr.url}
                        variant="primary"
                    >
                        Перейти к проекту
                    </Button>
                </div>
            </div>
        </li>
    );
};

export default ProjectTile;

const ProjectInfo: FC<{ project: ProjectType; className?: string }> = ({
    project,
    className,
}) => {
    const lang = locale.value === 'en' ? 'en' : 'ru';
    return (
        <div className={cn('mt-7 mb-17.5 md:mt-0 md:mb-0', className)}>
            <span class="mb-4 block uppercase">
                {project.attr.category?.[lang]}
            </span>
            <h2 class="mb-6 text-3xl font-semibold hyphens-auto md:mb-5 xl:text-4xl">
                {project.attr.title[lang]}
            </h2>
            <ul class="flex flex-wrap gap-x-3 gap-y-3">
                {project.attr.stacks.map((stack) => (
                    <Badge label={stack} />
                ))}
            </ul>
        </div>
    );
};
