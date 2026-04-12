import AdaptiveImg from '@/components/ui/AdaptiveImg';
import HeroLayout from '@/layouts/HeroLayout';
import type { ProjectType } from '@/lib/types/models/projects';
import { locale } from '@/signals/locale';
import type { FC } from 'preact/compat';
import ProjectBrief, { ProjectBriefFallback } from './ProjectBrief';
import ProjectMeta, { ProjectMetaFallback } from './ProjectMeta';

const Hero: FC<{ project: ProjectType | null; loading: boolean }> = ({
    project,
    loading,
}) => {
    return (
        <HeroLayout className="full-bleed-wrapper full-bleed px-0 pb-10 sm:px-0 sm:pb-12 lg:px-0 xl:pb-10 2xl:pb-12">
            {loading || project == null ? (
                <Skeleton />
            ) : (
                <Project project={project} />
            )}
        </HeroLayout>
    );
};

export default Hero;

const Project: FC<{ project: ProjectType }> = ({ project }) => {
    const lang = locale.value === 'en' ? 'en' : 'ru';

    return (
        <>
            <div class="mb-13 sm:mb-14 px-5 sm:px-15 xl:px-0 2xl:pl-8 2xl:pr-0 xl:mb-19.5 xl:flex xl:*:flex-[1_1_0] 2xl:mb-22">
                <ProjectMeta project={project} />
                <ProjectBrief className="hidden xl:block" project={project} />
            </div>

            {project.image && (
                <AdaptiveImg
                    prtClass="full-bleed px-4 sm:px-4.5 2xl:px-24"
                    imgClass="rounded-3xl sm:aspect-2/1 xl:aspect-10/4"
                    alt={project.image?.alt?.[lang]}
                    srcs={project.image.srcSet}
                />
            )}
            <ProjectBrief className="xl:hidden" project={project} />
        </>
    );
};

const Skeleton = () => {
    return (
        <>
            <div class="mb-13 sm:mb-14 px-5 sm:px-15 xl:px-0 2xl:pl-8 2xl:pr-0 xl:mb-19.5 xl:flex xl:*:flex-[1_1_0] 2xl:mb-22">
                <ProjectMetaFallback />
                <ProjectBriefFallback className="hidden xl:block" />
            </div>

            <div className="skeleton full-bleed size-full rounded-3xl sm:aspect-2/1 xl:aspect-10/4" />
            <ProjectBriefFallback className="xl:hidden" />
        </>
    );
};
