import Projects from '@/components/shared/Projects';
import AdaptiveImg from '@/components/ui/AdaptiveImg';
import PrimaryLink from '@/components/ui/PrimaryLink';
import SecondaryHeading from '@/components/ui/SecondaryHeading';
import useFetchRecords from '@/hooks/useFetchRecords';
import AppSection from '@/layouts/SectionLayout';
import { API_BASE_URL } from '@/lib/const/api';
import { playAudio } from '@/lib/helpers/playAudio';
import { cn } from '@/lib/helpers/utils';
import type { ProjectType } from '@/lib/types/models/projects';
import { locale } from '@/signals/locale';
import { getTheme } from '@/signals/theme';
import { type FC } from 'preact/compat';
import { featuredBgDarkSrcSet, featuredBgSrcSet } from '../data';

const Featured: FC<{ className?: string }> = ({ className }) => {
    const {
        data: projects,
        loading,
        errors,
    } = useFetchRecords<ProjectType[]>({
        url: `${API_BASE_URL}projects?limit=6`,
        shouldCache: true
    });

    const lang = locale.value === 'ru' ? 'ru' : 'en';

    return (
        <AppSection
            className={cn(
                'relative isolate bg-contain bg-no-repeat',
                className,
            )}
        >
            <div
                aria-hidden="true"
                class="absolute inset-0 isolate -z-5 h-fit overflow-clip md:rounded-xl"
            >
                <AdaptiveImg
                    srcs={
                        getTheme() === 'light'
                            ? featuredBgSrcSet
                            : featuredBgDarkSrcSet
                    }
                    imgClass="w-full object-contain"
                />
                <div class="absolute inset-0 z-5 bg-[linear-gradient(180deg,rgba(242,246,250,0.3)0%,#fff_50%)] dark:bg-[linear-gradient(180deg,rgba(30,32,33,0.5)0%,#1E2021_50%)]" />
            </div>
            <SecondaryHeading className="motion-safe:animate-fade-in max-w-258 text-balance">
                Адаптивный дизайн, высокая производительность и удобство
                интерфейсов.
            </SecondaryHeading>
            <p
                key={`${lang}-content`}
                class="motion-safe:animate-fade-in max-w-208"
            >
                Здесь представлены мои проекты, а также информация о моем опыте
                и профессиональной деятельности. Я подробно рассказываю, как
                создавался каждый проект, и описываю ключевые этапы работы. Если
                вы заинтересованы в сотрудничестве, буду рад обсудить создание
                вашего проекта. Спасибо, что заглянули, надеюсь, вам понравится
                мое портфолио!
            </p>

            <Projects
                className="sm:-mx-5 xl:-mx-15"
                errors={errors}
                projects={projects}
                loading={loading}
            />

            <PrimaryLink
                key={`${lang}-gallery-btn`}
                onClick={() => playAudio('click')}
                href="/gallery"
                className="motion-safe:animate-fade-in clickable-btn mx-auto mt-22 w-fit"
            >
                {lang === 'en' ? 'All projects' : 'На страницу проектов'}
            </PrimaryLink>
        </AppSection>
    );
};

export default Featured;
