import AdaptiveImg from '@/components/ui/AdaptiveImg';
import PrimaryLink from '@/components/ui/PrimaryLink';
import SecondaryHeading from '@/components/ui/SecondaryHeading';
import AppSection from '@/layouts/SectionLayout';
import { cn } from '@/lib/helpers/utils';
import type { ProjectType } from '@/lib/types/models/projects';
import { getTheme } from '@/signals/theme';
import { useState, type FC } from 'preact/compat';
import { featuredBgSrcSet } from '../data';

const Featured: FC<{ className?: string }> = ({ className }) => {
    // const { fetchData, loading, errors } = useFetch();
    const [projects, setProjects] = useState<ProjectType[] | null>(null);

    // useEffect(() => {
    //     fetchData({
    //         url: '/api/projects',
    //         onSuccess: (data) => {
    //             setProjects(data.data);
    //         },
    //     });
    // }, []);

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
                    srcs={featuredBgSrcSet}
                    imgClass="w-full object-contain"
                />
                <div
                    class="absolute inset-0 z-5"
                    style={
                        getTheme() === 'dark'
                            ? {
                                  background: `linear-gradient(180deg, rgba(30, 32, 33, 0.83) 0%, #1E2021 90.87%)`,
                              }
                            : {
                                  background: `linear-gradient(180deg, rgba(242,246,250,0) 0%, #fff 90.87%)`,
                              }
                    }
                />
            </div>
            <SecondaryHeading>
                Адаптивный дизайн, высокая производительность и удобство
                интерфейсов.
            </SecondaryHeading>
            <p class="max-w-208">
                Здесь представлены мои проекты, а также информация о моем опыте
                и профессиональной деятельности. Я подробно рассказываю, как
                создавался каждый проект, и описываю ключевые этапы работы. Если
                вы заинтересованы в сотрудничестве, буду рад обсудить создание
                вашего проекта. Спасибо, что заглянули, надеюсь, вам понравится
                мое портфолио!
            </p>

            {/* <Projects errors={errors} projects={projects} loading={loading} /> */}

            <PrimaryLink href="/portfolio" className="mx-auto mt-22 w-fit">
                На страницу проектов
            </PrimaryLink>
        </AppSection>
    );
};

export default Featured;
