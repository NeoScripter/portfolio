import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/helpers/utils';
import type { ProjectType } from '@/lib/types/models/projects';
import { locale } from '@/signals/locale';
import type { FC } from 'preact/compat';

const ProjectBrief: FC<{ project: ProjectType; className?: string }> = ({
    project,
    className,
}) => {
    const lang = locale.value === 'en' ? 'en' : 'ru';

    return (
        <div
            className={cn(
                'xl:border-foreground mt-14 px-5 sm:px-15 xl:mt-0 xl:ml-19 xl:border-l xl:px-0 xl:pl-19 2xl:mt-6.5 2xl:ml-24 2xl:pr-8 2xl:pl-24',
                className,
            )}
        >
            <p class="mb-10 text-base sm:mb-12 sm:text-xl xl:mb-8.5 2xl:mb-10">
                {project.attr.description[lang]}
            </p>

            <Button
                class="ml-auto xl:ml-0"
                href={project.attr.link}
                target="_blank"
                variant="primary"
            >
                {lang === 'ru' ? 'Перейти на сайт' : 'Visit website'}
            </Button>
        </div>
    );
};

export const ProjectBriefFallback: FC<{ className: string }> = ({
    className,
}) => {
    return (
        <div
            className={cn(
                'xl:border-foreground mt-14 px-5 sm:px-15 xl:mt-0 xl:ml-19 xl:border-l xl:px-0 xl:pl-19 2xl:mt-6.5 2xl:ml-24 2xl:pr-8 2xl:pl-24',
                className,
            )}
        >
            <p class="skeleton mb-10 rounded-sm text-base sm:mb-12 sm:text-xl xl:mb-8.5 2xl:mb-10">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut et
                consequatur illo necessitatibus quasi rerum aspernatur dolorum
                tenetur placeat molestiae, blanditiis assumenda delectus facilis
                magni dolorem consequuntur voluptatibus at culpa asperiores
                ipsam tempore maxime odio itaque ad. Quidem, labore accusamus?
            </p>

            <div className="skeleton ml-auto w-fit rounded-sm py-2 xl:ml-0">
                Lorem ipsum Lorem ipsum
            </div>
        </div>
    );
};

export default ProjectBrief;
