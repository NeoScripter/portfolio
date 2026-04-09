import type { ProjectType } from '@/lib/types/models/projects';
import { getTheme } from '@/signals/theme';
import { locale } from '@/signals/locale';
import { cn } from '@/lib/helpers/utils';
import type { FC } from 'preact/compat';
import AdaptiveImg from '../ui/AdaptiveImg';

const ProjectCard: FC<{ project: ProjectType }> = ({ project }) => {
    const lang = locale.value === 'ru' ? 'ru' : 'en';

    return (
        <li
            class={cn(
                'shadow-project relative isolate justify-self-center overflow-clip rounded-md transition-transform duration-300 ease-in-out select-none focus-within:scale-103 focus-within:ring-2 focus-within:ring-blue-500 hover:scale-103',
                getTheme() === 'dark' && 'bg-muted',
            )}
        >
            {project.image && (
                <div class="group relative">
                    <AdaptiveImg
                        prtClass="rounded-md aspect-5/6"
                        alt={project.image.alt?.[lang]}
                        srcs={project.image.srcSet}
                    />
                    <a
                        href={`/portfolio/${project.attributes?.slug}`}
                        class="absolute inset-0 z-1 block size-full focus:outline-none"
                    ></a>
                    <span
                        aria-hidden="true"
                        class="shine-element block group-hover:animate-[shine_750ms]"
                    />
                </div>
            )}
            <div class="px-5 pt-5 pb-7 sm:px-6 sm:pt-6 md:px-7 xl:px-8 xl:pt-8">
                <h4 class="mb-5.5 text-2xl font-medium hyphens-auto md:text-3xl xl:mb-7 2xl:text-4xl">
                    {project.attributes?.title?.[lang]}
                </h4>
                <p class="text-foreground/60 ellipsis-multiline text-sm md:text-base xl:text-lg">
                    {project.attributes?.description?.[lang]}
                </p>
            </div>
        </li>
    );
};

export default ProjectCard;

export const ProjectFallback = () => {
    return (
        <li
            class={cn(
                'shadow-project max-w-90 justify-self-center overflow-clip rounded-md select-none xl:max-w-100',
            )}
        >
            <div class="skeleton aspect-5/6 w-full rounded-md" />

            <div class="px-5 pt-5 pb-7 text-transparent sm:px-6 sm:pt-6">
                <h4 class="skeleton mb-5.5 text-2xl font-medium xl:text-2xl">
                    Lorem ipsum
                </h4>
                <p class="skeleton text-sm">
                    Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                    Lorem ipsum Lorem ipsum
                </p>
            </div>
        </li>
    );
};
