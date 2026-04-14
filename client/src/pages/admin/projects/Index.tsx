import AdminShellNav from '@/components/layout/AdminShellNav';
import AppTitle from '@/components/layout/AppTitle';
import Pagination from '@/components/ui/Pagination';
import { DeleteModalProvider } from '@/context/DeleteModelContext';
import useFetchProjects from '@/hooks/useFetchProjects';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import ModalLayout from '@/layouts/ModalLayout';
import { range } from '@/lib/helpers/utils';
import { useState } from 'preact/hooks';
import ProjectCard, { ProjectFallback } from './partials/ProjectCard';
import ProjectDelete from './partials/ProjectDelete';
import SearchBox from './partials/SearchBox';

const Index = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (val: string) => {
        handlePageClick(1);
        setSearchQuery(val);
    };

    const { projectData, errors, loading, projectsRef, handlePageClick } =
        useFetchProjects({ searchQuery, isLatest: true });

    if (errors != null) {
        console.error(errors);
    }

    return (
        <DeleteModalProvider>
            <AdminLayout title={{ en: 'Projects', ru: 'Проекты' }}>
                <AppTitle titleEn="Projects" titleRu="Проекты" />

                <AdminShellLayout>
                    <AdminShellNav href={'projects/create'} />

                    {/* {projectData?.meta && ( */}
                    {/*     <div className="bg-background sticky top-0 z-10"> */}
                    {/*         <Pagination */}
                    {/*             onClick={handlePageClick} */}
                    {/*             meta={projectData.meta} */}
                    {/*         /> */}
                    {/*         <SearchBox */}
                    {/*             value={searchQuery} */}
                    {/*             handleChange={handleInputChange} */}
                    {/*         /> */}
                    {/*     </div> */}
                    {/* )} */}

                    {loading ? (
                        <ul ref={projectsRef} className="space-y-10">
                            {range(0, 8).map((idx) => (
                                <ProjectFallback key={idx} />
                            ))}
                        </ul>
                    ) : (
                        <ul className="space-y-10">
                            {projectData?.data &&
                            projectData.data.length > 0 ? (
                                projectData.data.map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                    />
                                ))
                            ) : (
                                <p class="ml-4">
                                    No projects matching your search have been
                                    found
                                </p>
                            )}
                        </ul>
                    )}
                    <ModalLayout className="max-w-9/10 px-10 py-14 sm:max-w-100 lg:max-w-160">
                        <ProjectDelete />
                    </ModalLayout>
                </AdminShellLayout>
            </AdminLayout>
        </DeleteModalProvider>
    );
};

export default Index;
