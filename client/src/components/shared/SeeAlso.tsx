import clickSound from '@/assets/audio/click.mp3';
import { useFetch } from '@/hooks/useFetch';
import AppSection from '@/layouts/SectionLayout';
import { API_BASE_URL } from '@/lib/const/api';
import { cn, playAudio } from '@/lib/helpers/utils';
import type { ProjectType } from '@/lib/types/models/projects';
import type { FC } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import PrimaryLink from '../ui/PrimaryLink';
import SecondaryHeading from '../ui/SecondaryHeading';
import Projects from './Projects';

const SeeAlso: FC<{
    className?: string;
    title: string;
    excludedId?: number;
}> = ({ className, title, excludedId }) => {
    const { fetchData, loading, errors } = useFetch();
    const [projects, setProjects] = useState<ProjectType[] | null>(null);

    useEffect(() => {
        let req = `${API_BASE_URL}projects?limit=3`;

        if (excludedId != null) {
            req = `${req}&exclude=${excludedId}`;
        }
        fetchData({
            url: req,
            onSuccess: (data) => {
                setProjects(data.data);
            },
        });
    }, [excludedId]);

    if (projects && projects.length === 0) {
        return null;
    }

    return (
        <AppSection className={cn('xl:px-0', className)}>
            <div className="xl:flex xl:items-baseline xl:justify-between">
                <SecondaryHeading className="xs:text-center xs:text-balance text-center text-4xl xl:text-5xl">
                    {title}
                </SecondaryHeading>
                <PrimaryLink
                    href="/gallery"
                    onClick={() => playAudio(clickSound)}
                    className="clickable-btn mx-auto mt-22 mr-0 hidden w-fit xl:flex"
                >
                    На страницу проектов
                </PrimaryLink>
            </div>

            <Projects
                errors={errors}
                projects={projects}
                loading={loading}
                className="mx-auto max-w-100 sm:max-w-full sm:grid-cols-4 sm:*:col-span-2 sm:*:last-of-type:col-start-2 xl:grid-cols-3 xl:*:col-span-1 xl:*:last-of-type:col-start-auto"
            />

            <PrimaryLink
                href="/gallery"
                className="mx-auto mt-22 w-fit xl:hidden"
                onClick={() => playAudio(clickSound)}
            >
                На страницу проектов
            </PrimaryLink>
        </AppSection>
    );
};

export default SeeAlso;
