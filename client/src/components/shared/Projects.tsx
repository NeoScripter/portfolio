import ApiError from '@/components/ui/ApiError';
import { cn, range } from '@/lib/helpers/utils';
import type { ProjectType } from '@/lib/types/models/projects';
import { locale } from '@/signals/locale';
import type{ FC } from 'preact/compat';
import ProjectCard, { ProjectFallback } from './ProjectCard';

const Projects: FC<{
    className?: string;
    projects: ProjectType[] | null;
    loading: boolean;
    errors: unknown | null;
}> = ({ className, projects, loading, errors }) => {
    const listLabel = locale.value === 'ru' ? 'проекты' : 'projects';

    if (errors != null)
        return <ApiError resourceRu="проектов" resourceEn="projects" />;
    return (
        <div className="relative z-10">
            <div className="relative mt-16 sm:mt-26 lg:mt-28">
                <ul
                    className={cn(
                        'grid place-content-center gap-y-15 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3 xl:gap-6 2xl:gap-15',
                        className,
                    )}
                    role="tablist"
                    aria-label={listLabel}
                    aria-live="polite"
                >
                    {!loading
                        ? projects
                              ?.slice(0, 6)
                              .map((project) => (
                                  <ProjectCard
                                      key={project.id}
                                      project={project}
                                  />
                              ))
                        : range(0, 6).map((skeleton) => (
                              <ProjectFallback
                                  key={`project-skeleton-${skeleton}`}
                              />
                          ))}
                </ul>
            </div>
        </div>
    );
};

export default Projects;
