import ApiError from '@/components/ui/ApiError';
import EmptySearch from '@/components/ui/EmptySearch';
import Pagination from '@/components/ui/Pagination';
import SearchBar from '@/components/ui/SearchBar';
import useFilteredProjects from '@/hooks/useFilteredProjects';
import { cn, hasErrorDetails, range } from '@/lib/helpers/utils';
import type { NodeProps } from '@/lib/types/shared';
import type { FC } from 'preact/compat';
import ProjectTile from './ProjectTile';
import ProjectTileFallback from './ProjectTileFallback';

const ProjectFeed: FC<NodeProps> = ({ className }) => {
    const { projectData, errors, loading, projectsRef } = useFilteredProjects();

    if (hasErrorDetails(errors))
        return (
            <ApiError
                resourceRu="проектов"
                resourceEn="projectData"
                mb={true}
            />
        );

    return (
        <div className={cn('full-bleed', className)}>
            <SearchBar />
            <section ref={projectsRef} className="scroll-m-80">
                {projectData?.data != null && !loading ? (
                    projectData.data.length > 0 ? (
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
                    )
                ) : (
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
                )}
            </section>

            <Pagination
                className="mt-12.5 mb-13.5 md:mt-17.5 md:mb-27 xl:mt-13.5 xl:mb-21 2xl:mt-13.5 2xl:mb-21"
                // meta={projectData.meta}
                total={5}
            />
        </div>
    );
};

export default ProjectFeed;
