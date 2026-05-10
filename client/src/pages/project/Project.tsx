import AppTitle from '@/components/layout/AppTitle';
import SeeAlso from '@/components/shared/SeeAlso';
import ApiError from '@/components/ui/ApiError';
import useFetchRecords from '@/hooks/useFetchRecords';
import type { ServerError } from '@/hooks/useForm';
import AppLayout from '@/layouts/AppLayout';
import { API_BASE_URL } from '@/lib/const/api';
import { cn, hasErrorDetails } from '@/lib/helpers/utils';
import type { ModuleType } from '@/lib/types/models/module';
import type { ProjectType } from '@/lib/types/models/projects';
import type { ComponentChildren, FunctionalComponent } from 'preact';
import type { FC } from 'preact/compat';
import Hero from './partials/Hero';
import Module from './partials/Module';
import ModuleFallback from './partials/ModuleFallback';

interface ProjectProps {
    slug: string;
}

const skeletonTypes = [
    'only_text',
    'two_image_block',
    'one_image_split',
    'two_image_split',
];

const Project: FunctionalComponent<ProjectProps> = ({ slug }) => {
    const {
        data: projectData,
        loading: projectLoading,
        errors: projectErrors,
    } = useFetchRecords<{ data: ProjectType }>({
        url: `${API_BASE_URL}projects/${slug}`,
        shouldCache: true,
    });

    const {
        data: moduleData,
        loading: moduleLoading,
        errors: moduleErrors,
    } = useFetchRecords<{ data: ModuleType[] }>({
        url: `${API_BASE_URL}modules/${slug}`,
        shouldCache: true,
    });

    if (hasErrorDetails(projectErrors))
        return (
            <AppLayout className="mt-40 px-5">
                <AppTitle titleEn="Error" titleRu="Ошибка" />
                <ApiError
                    resourceRu="проекта"
                    resourceEn="project"
                    mb={true}
                    mt={true}
                />
            </AppLayout>
        );

    const project = projectData?.data;

    return (
        <AppLayout className="full-bleed-wrapper md:px-0 xl:px-0">
            {project && (
                <AppTitle
                    titleEn={project.attr.title.en}
                    titleRu={project.attr.title.ru}
                />
            )}
            <Hero loading={projectLoading} project={project} />

            <StateResolver errors={moduleErrors} loading={moduleLoading}>
                {moduleData?.data &&
                    moduleData.data.map((module, idx) => (
                        <Module
                            key={module.id}
                            className={cn(
                                idx % 2 !== 0 &&
                                    'bg-muted full-bleed full-bleed-padding',
                            )}
                            module={module}
                        />
                    ))}
            </StateResolver>

            {project && (
                <SeeAlso title="Другие проекты" excludedId={project.id} />
            )}
        </AppLayout>
    );
};

export default Project;

const StateResolver: FC<{
    errors: ServerError | null;
    loading: boolean;
    children: ComponentChildren;
}> = ({ errors, loading, children }) => {
    if (loading) {
        return (
            <ul>
                {skeletonTypes.map((type) => (
                    <ModuleFallback key={type} type={type} />
                ))}
            </ul>
        );
    }

    if (hasErrorDetails(errors)) {
        console.error(errors);
        return (
            <ApiError resourceRu="проектов" resourceEn="projects" mb={true} />
        );
    }

    return children;
};
