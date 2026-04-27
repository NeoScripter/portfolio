import AdminShellNav from '@/components/layout/AdminShellNav';
import AppTitle from '@/components/layout/AppTitle';
import { DeleteModalProvider } from '@/context/DeleteModelContext';
import useFilteredProjects from '@/hooks/useFilteredProjects';
import AccordionLayout from '@/layouts/AccordionLayout';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import DeleteModalLayout from '@/layouts/DeleteModalLayout';
import { hasErrorDetails, range } from '@/lib/helpers/utils';
import { useSignal } from '@preact/signals';
import { ListTodo, Split } from 'lucide-preact';
import { useState } from 'preact/hooks';
import CategoryList from './partials/CategoryList';
import ProjectCard, { ProjectFallback } from './partials/ProjectCard';
import ProjectDelete from './partials/ProjectDelete';

const Index = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const showCategoryPanel = useSignal(false);

    const handleInputChange = (val: string) => {
        handlePageClick(1);
        setSearchQuery(val);
    };

    const { projectData, errors, loading, projectsRef, handlePageClick } =
        useFilteredProjects({ searchQuery, isLatest: true });

    if (hasErrorDetails(errors)) {
        console.error(errors);
    }

    return (
        <DeleteModalProvider>
            <AdminLayout title={{ en: 'Projects', ru: 'Проекты' }}>
                <AppTitle titleEn="Projects" titleRu="Проекты" />

                <AdminShellLayout>
                    <AccordionLayout
                        showIcon={ListTodo}
                        label="Categories"
                        handleClick={() =>
                            (showCategoryPanel.value = !showCategoryPanel.value)
                        }
                        show={showCategoryPanel.value}
                    >
                        <CategoryList />
                    </AccordionLayout>

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
                        <ul ref={projectsRef} className="space-y-8">
                            {range(0, 8).map((idx) => (
                                <ProjectFallback key={idx} />
                            ))}
                        </ul>
                    ) : (
                        <ul className="space-y-8">
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
                    <DeleteModalLayout>
                        <ProjectDelete />
                    </DeleteModalLayout>
                </AdminShellLayout>
            </AdminLayout>
        </DeleteModalProvider>
    );
};

export default Index;
