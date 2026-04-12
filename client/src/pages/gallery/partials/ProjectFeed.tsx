import ApiError from '@/components/ui/ApiError';
import SearchBar from '@/components/ui/SearchBar';
import useFetchProjects from '@/hooks/useFetchProjects';
import { cn, range } from '@/lib/helpers/utils';
import type { NodeProps } from '@/lib/types/shared';
import type{ FC, JSX } from 'preact/compat';
import { useState } from 'preact/hooks';
import ProjectTile from './ProjectTile';
import EmptySearch from '@/components/ui/EmptySearch';
import ProjectTileFallback from './ProjectTileFallback';
import Pagination from '@/components/ui/Pagination';

const ProjectFeed: FC<NodeProps> = ({ className }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [debounceQuery, setDebounceQuery] = useState('');

    const { projectData, errors, loading, projectsRef, handlePageClick } =
        useFetchProjects({ searchQuery: debounceQuery });

    const handleInputChange = (val: string) => {
        setSearchQuery(val);
    };

    const handleSeachSubmit = (
        e: JSX.TargetedEvent<HTMLFormElement, Event>,
    ) => {
        e.preventDefault();
        handlePageClick(1);
        setDebounceQuery(searchQuery);
    };

    if (errors != null)
        return <ApiError resourceRu="проектов" resourceEn="projectData" />;

    return (
        <div className={cn('full-bleed',className)}>
            <SearchBar
                handleSubmit={handleSeachSubmit}
                value={searchQuery}
                handleChange={handleInputChange}
            />
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

            {projectData?.meta && (
                <Pagination
                    className="mt-12.5 mb-13.5 md:mt-17.5 md:mb-27 xl:mt-13.5 xl:mb-21 2xl:mt-13.5 2xl:mb-21"
                    onClick={handlePageClick}
                    meta={projectData.meta}
                />
            )}
        </div>
    );
};

export default ProjectFeed;
