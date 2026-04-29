import ApiError from '@/components/ui/ApiError';
import EmptySearch from '@/components/ui/EmptySearch';
import Pagination from '@/components/ui/Pagination';
import SearchBar from '@/components/ui/SearchBar';
import useFilteredProjects from '@/hooks/useFilteredProjects';
import type { ServerError } from '@/hooks/useForm';
import { cn, hasErrorDetails, range } from '@/lib/helpers/utils';
import type { NodeProps } from '@/lib/types/shared';
import type { ComponentChildren } from 'preact';
import type { FC } from 'preact/compat';
import ProjectTile from './ProjectTile';
import ProjectTileFallback from './ProjectTileFallback';

const ProjectFeed: FC<NodeProps> = ({ className }) => {
    const { projectData, errors, loading, projectsRef } = useFilteredProjects({
        delay: 0,
    });

    const hasProjects =
        projectData?.data !== undefined && projectData?.data?.length > 0;

    return (
        <div className={cn('full-bleed', className)}>
            <SearchBar />
            <section ref={projectsRef} className="scroll-m-80">
                <StateResolver errors={errors} loading={loading}>
                    {hasProjects ? (
                        <ul>
                            {projectData.data.map((project, idx) => (
                                <ProjectTile
                                    key={project.id}
                                    className={cn(
                                        idx % 2 === 0
                                            ? 'bg-muted'
                                            : 'flex-row-reverse *:md:flex-row-reverse *:lg:flex-col',
                                    )}
                                    project={project}
                                />
                            ))}
                        </ul>
                    ) : (
                        <EmptySearch />
                    )}
                </StateResolver>
            </section>

            {hasProjects && projectData?.meta && (
                <Pagination
                    className="mt-12.5 mb-13.5 md:mt-17.5 md:mb-27 xl:mt-13.5 xl:mb-21 2xl:mt-13.5 2xl:mb-21"
                    meta={projectData.meta}
                />
            )}
        </div>
    );
};

export default ProjectFeed;

const StateResolver: FC<{
    errors: ServerError | null;
    loading: boolean;
    children: ComponentChildren;
}> = ({ errors, loading, children }) => {
    if (loading) {
        return (
            <ul>
                {range(0, 7).map((idx) => (
                    <ProjectTileFallback
                        className={cn(
                            idx % 2 !== 0 &&
                                'flex-row-reverse *:md:flex-row-reverse *:lg:flex-col',
                        )}
                        key={idx}
                    />
                ))}
            </ul>
        );
    }

    if (hasErrorDetails(errors)) {
        console.error(errors);
        return (
            <ApiError
                resourceRu="проектов"
                resourceEn="projectData"
                mb={true}
            />
        );
    }

    return children;
};
