import { DeleteModalProvider } from '@/context/DeleteModelContext';
import { useFetch } from '@/hooks/useFetch';
import AccordionLayout from '@/layouts/AccordionLayout';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import ModalLayout from '@/layouts/ModalLayout';
import type { ProjectType } from '@/lib/types/models/projects';
import { Clapperboard } from 'lucide-preact';
import { useRoute } from 'preact-iso';
import { useEffect, useState } from 'preact/hooks';
import ModuleDelete from './partials/ModuleDelete';
import ProjectUpsert from './partials/ProjectUpsert';

const EditProject = () => {
    const { fetchData, loading, errors } = useFetch();
    const [project, setProject] = useState<ProjectType | null>(null);
    const [visibleItem, setVisibleItem] = useState<number | null>(null);
    const {
        params: { slug },
    } = useRoute();

    const handleAccordionClick = (idx: number) => {
        if (idx === visibleItem) {
            setVisibleItem(null);
        } else {
            setVisibleItem(idx);
        }
    };

    useEffect(() => {
        const fetchProject = () => {
            fetchData({
                url: `/api/projects/${slug}.json`,
                onSuccess: (data) => {
                    setProject(data.data);
                },
            });
        };

        fetchProject();

        document.addEventListener('itemDeleted', fetchProject);

        return () => document.removeEventListener('itemDeleted', fetchProject);
    }, []);

    if (errors != null) {
        console.error(errors);
    }

    return (
        <DeleteModalProvider>
            <AdminLayout
                title={{ en: 'Edit project', ru: 'Редактировать проект' }}
            >
                <AdminShellLayout>
                    <AccordionLayout
                        label="Project"
                        handleClick={() => handleAccordionClick(0)}
                        show={visibleItem === 0}
                        showIcon={Clapperboard}
                    >
                        {errors != null ? (
                            <p>{errors.errors?.message}</p>
                        ) : loading || project == null ? (
                            'Loading...'
                        ) : (
                            <ProjectUpsert project={project} />
                        )}
                    </AccordionLayout>
                    <ModalLayout className="max-w-9/10 px-10 py-14 sm:max-w-100 lg:max-w-160">
                        <ModuleDelete />
                    </ModalLayout>
                </AdminShellLayout>
            </AdminLayout>
        </DeleteModalProvider>
    );
};

export default EditProject;

// {project && (
//     <AccordionLayout
//         key="newModule"
//         label="New Module"
//         handleClick={() => handleAccordionClick(1)}
//         show={visibleItem === 1}
//     >
//         <ModuleUpsert projectId={project.id} />
//     </AccordionLayout>
// )}
// {project?.modules &&
//     project.modules.map((module, idx) => (
//         <AccordionLayout
//             key={module.id}
//             label={`Module ${idx + 1}`}
//             handleClick={() =>
//                 handleAccordionClick(idx + 2)
//             }
//             show={visibleItem === idx + 2}
//         >
//             <ModuleUpsert
//                 module={module}
//                 projectId={project.id}
//             />
//         </AccordionLayout>
//     ))}
