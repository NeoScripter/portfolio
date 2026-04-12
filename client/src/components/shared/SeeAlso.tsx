
import AppSection from '@/layouts/SectionLayout';
import { useEffect, useState } from 'preact/hooks';
import type { FC } from 'preact/compat';
import type { ProjectType } from '@/lib/types/models/projects';
import { cn } from '@/lib/helpers/utils';
import SecondaryHeading from '../ui/SecondaryHeading';
import PrimaryLink from '../ui/PrimaryLink';
import Projects from './Projects';
import { useFetch } from '@/hooks/useFetch';

const SeeAlso: FC<{
    className?: string;
    title: string;
    excludedId?: number;
}> = ({ className, title, excludedId }) => {
    const { fetchData, loading, errors } = useFetch();
    const [projects, setProjects] = useState<ProjectType[] | null>(null);

    useEffect(() => {
        let req = '/api/projects.json';

        if (excludedId != null) {
            req += `${req}&exclude=${excludedId}`;
        }
        fetchData({
            url: req,
            onSuccess: (data) => {
                setProjects(data.data);
            },
        });
    }, []);

    return (
        <AppSection
            className={cn(
                'xl:px-0',
                className,
            )}
        >
            <div className="xl:flex xl:items-baseline xl:justify-between">
                <SecondaryHeading className="xs:text-center xs:text-balance text-center text-4xl xl:text-5xl">
                    {title}
                </SecondaryHeading>
                <PrimaryLink
                    href="/gallery"
                    className="mx-auto mt-22 mr-0 hidden w-fit xl:flex"
                >
                    На страницу проектов
                </PrimaryLink>
            </div>

            <Projects
                errors={errors}
                projects={projects}
                loading={loading}
                className="max-w-100 mx-auto sm:max-w-full sm:grid-cols-4 sm:*:col-span-2 sm:*:last-of-type:col-start-2 xl:grid-cols-3 xl:*:col-span-1 xl:*:last-of-type:col-start-auto"
            />

            <PrimaryLink
                href="/gallery"
                className="mx-auto mt-22 w-fit xl:hidden"
            >
                На страницу проектов
            </PrimaryLink>
        </AppSection>
    );
};

export default SeeAlso;
