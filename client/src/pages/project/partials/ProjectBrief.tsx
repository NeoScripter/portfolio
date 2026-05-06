import { Button } from '@/components/ui/Button';
import { playAudio } from '@/lib/helpers/playAudio';
import { cn } from '@/lib/helpers/utils';
import type { ProjectType } from '@/lib/types/models/projects';
import { locale } from '@/signals/locale';
import type { FC } from 'preact/compat';

const ProjectBrief: FC<{ project: ProjectType; className?: string }> = ({
    project,
    className,
}) => {
    const lang = locale.value === 'en' ? 'en' : 'ru';
    const noLink = project.attr.link == null;

    const tooltipMessage =
        lang === 'ru'
            ? 'К сожалению, данный сайт больше не работает :( Такое иногда случается, когда владелец сайта забывает заплатить за хостинг. Тем не менее, вы можете посмотреть его скриншоты с тех недавних времен, когда он радовал своих пользователей каждый день :)'
            : 'Unfortunately, the website is no longer online :( Maybe the its owner forgot to pay for the hosting or was too busy to do it. But you can still see the screenshots of it on this page from the bright times when it was still online :)';

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

            <div class="group relative z-10 w-fit">
                {noLink && (
                    <span class="bg-background border-muted-foreground/50 pointer-events-none absolute inset-x-0 -translate-y-[110%] rounded-md border p-3 text-sm text-balance opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 xl:top-auto xl:bottom-0 xl:translate-y-[110%]">
                        {' '}
                        {tooltipMessage}
                    </span>
                )}
                <Button
                    class="ml-auto xl:ml-0"
                    href={project.attr.link ?? ''}
                    target="_blank"
                    variant="primary"
                    disabled={noLink}
                    onClick={() => playAudio('click')}
                >
                    {lang === 'ru' ? 'Перейти на сайт' : 'Visit website'}
                </Button>
            </div>
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
