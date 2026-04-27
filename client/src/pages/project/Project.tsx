import AppTitle from '@/components/layout/AppTitle';
import SeeAlso from '@/components/shared/SeeAlso';
import ApiError from '@/components/ui/ApiError';
import { useFetch } from '@/hooks/useFetch';
import AppLayout from '@/layouts/AppLayout';
import { API_BASE_URL } from '@/lib/const/api';
import { cn } from '@/lib/helpers/utils';
import type { ModuleType } from '@/lib/types/models/module';
import type { ProjectType } from '@/lib/types/models/projects';
import type { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
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
    const { fetchData, loading, errors } = useFetch();
    const [project, setProject] = useState<ProjectType | null>(null);
    const [modules, setModules] = useState<ModuleType[] | null>(null);

    useEffect(() => {
        fetchData({
            url: `${API_BASE_URL}projects/${slug}`,
            onSuccess: (data) => {
                setProject(data.data);
            },
        });
        fetchData({
            url: `${API_BASE_URL}modules/${slug}`,
            onSuccess: (data) => {
                setModules(data.data);
            },
        });
    }, [slug]);

    if (errors != null)
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

    return (
        <AppLayout className="full-bleed-wrapper md:px-0 xl:px-0">
            {project && (
                <AppTitle
                    titleEn={project.attr.title.en}
                    titleRu={project.attr.title.ru}
                />
            )}
            <Hero loading={loading} project={project} />
            {!loading
                ? project && modules?.map((module, idx) => (
                      <Module
                          key={module.id}
                          className={cn(
                              idx % 2 !== 0 &&
                                  'bg-muted full-bleed full-bleed-padding',
                          )}
                          module={module}
                      />
                  ))
                : skeletonTypes.map((type) => (
                      <ModuleFallback key={type} type={type} />
                  ))}
            {project && (
                <SeeAlso
                    title="Другие проекты"
                    // excludedId={project.id}
                />
            )}
        </AppLayout>
    );
};

export default Project;
