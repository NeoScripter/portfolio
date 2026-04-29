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
            <div class="mb-13 px-5 sm:mb-14 sm:px-15 xl:mb-19.5 xl:flex xl:px-0 xl:*:flex-[1_1_0] 2xl:mb-22 2xl:pr-0 2xl:pl-8">
                <ProjectMeta project={project} />
                <ProjectBrief className="hidden xl:block" project={project} />
            </div>

            {project.image && (
                <AdaptiveImg
                    prtClass="full-bleed [--offset:16px] sm:[--offset:18px] xl:[--offset:96px] max-w-[calc(100%-var(--offset))] mx-auto rounded-3xl"
                    imgClass="sm:aspect-2/1 xl:aspect-10/4"
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
            <div class="mb-13 px-5 sm:mb-14 sm:px-15 xl:mb-19.5 xl:flex xl:px-0 xl:*:flex-[1_1_0] 2xl:mb-22 2xl:pr-0 2xl:pl-8">
                <ProjectMetaFallback />
                <ProjectBriefFallback className="hidden xl:block" />
            </div>

            <div className="skeleton full-bleed full-bleed mx-auto size-full max-w-[calc(100%-var(--offset))] rounded-3xl [--offset:16px] sm:aspect-2/1 sm:[--offset:18px] xl:aspect-10/4 xl:[--offset:96px]" />
            <ProjectBriefFallback className="xl:hidden" />
        </>
    );
};
