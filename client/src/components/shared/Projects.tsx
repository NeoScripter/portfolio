import ApiError from '@/components/ui/ApiError';
import { cn, hasErrorDetails, range } from '@/lib/helpers/utils';
import type { ProjectType } from '@/lib/types/models/projects';
import type { FC } from 'preact/compat';
import ProjectCard, { ProjectFallback } from './ProjectCard';

const Projects: FC<{
    className?: string;
    projects: ProjectType[] | undefined;
    loading: boolean;
    errors: unknown | null;
}> = ({ className, projects, loading, errors }) => {
    if (hasErrorDetails(errors))
        return (
            <ApiError resourceRu="проектов" resourceEn="projects" mt={true} />
        );
    return (
        <div className="relative z-10">
            <div className="relative mt-20 sm:mt-26">
                <ul
                    className={cn(
                        'grid grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] place-content-center gap-x-8 gap-y-15 xl:gap-x-10 2xl:grid-cols-3',
                        className,
                    )}
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
