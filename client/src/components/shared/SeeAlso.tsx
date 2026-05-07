import useFetchRecords from '@/hooks/useFetchRecords';
import AppSection from '@/layouts/SectionLayout';
import { API_BASE_URL } from '@/lib/const/api';
import { playAudio } from '@/lib/helpers/playAudio';
import { cn } from '@/lib/helpers/utils';
import type { ProjectType } from '@/lib/types/models/projects';
import { locale } from '@/signals/locale';
import type { FC } from 'preact/compat';
import PrimaryLink from '../ui/PrimaryLink';
import SecondaryHeading from '../ui/SecondaryHeading';
import Projects from './Projects';

const SeeAlso: FC<{
    className?: string;
    title: string;
    excludedId?: number;
}> = ({ className, title, excludedId }) => {
    let req = `${API_BASE_URL}projects?limit=3`;

    if (excludedId != null) {
        req = `${req}&exclude=${excludedId}`;
    }

    const {
        data: projects,
        loading,
        errors,
    } = useFetchRecords<ProjectType[]>({
        url: req,
        shouldCache: true,
    });

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
                    onClick={() => playAudio('click')}
                    className="clickable-btn mx-auto mt-22 mr-0 hidden w-fit xl:flex"
                >
                    <span
                        key={`${locale.value}-link`}
                        class="motion-safe:animate-fade-in"
                    >
                        {locale.value === 'en'
                            ? 'All projects'
                            : 'На страницу проектов'}
                    </span>
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
                onClick={() => playAudio('click')}
            >
                <span
                    key={`${locale.value}-link`}
                    class="motion-safe:animate-fade-in"
                >
                    {locale.value === 'en'
                        ? 'All projects'
                        : 'На страницу проектов'}
                </span>
            </PrimaryLink>
        </AppSection>
    );
};

export default SeeAlso;
