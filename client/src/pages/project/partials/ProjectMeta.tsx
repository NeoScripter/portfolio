import Badge from '@/components/ui/Badge';
import { cn, range } from '@/lib/helpers/utils';
import type { ProjectType } from '@/lib/types/models/projects';
import { locale } from '@/signals/locale';
import type { FC } from 'preact/compat';

const ProjectMeta: FC<{ project: ProjectType; className?: string }> = ({
    project,
    className,
}) => {
    const lang = locale.value === 'en' ? 'en' : 'ru';
    return (
        <div className={cn('', className)}>
            <span class="mb-4 block text-lg uppercase sm:mb-5 sm:text-2xl">
                {project.attr.category?.[lang]}
            </span>
            <h2 class="mb-7 text-3xl font-semibold hyphens-auto sm:mb-8 sm:text-5xl">
                {project.attr.title[lang]}
            </h2>
            <ul class="flex flex-wrap gap-3 xl:gap-4">
                {project.attr.stacks.map((stack) => (
                    <Badge
                        className="sm:text-lg"
                        label={stack}
                        isClickable={false}
                    />
                ))}
            </ul>
        </div>
    );
};
export const ProjectMetaFallback = () => {
    return (
        <div>
            <span class="skeleton mb-4 block w-fit rounded-sm text-lg uppercase sm:mb-5 sm:text-2xl">
                Lorem ipsum
            </span>
            <h2 class="skeleton mb-7 rounded-sm text-3xl font-semibold hyphens-auto sm:mb-8 sm:text-5xl">
                Lorem ipsum dummy text
            </h2>
            <ul class="flex flex-wrap gap-3 xl:gap-4">
                {range(0, 6).map((idx) => (
                    <li
                        class="skeleton flex items-center justify-center rounded-3xl px-4 py-2 xl:px-5 xl:py-3"
                        key={idx}
                    >
                        Lorem
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectMeta;
