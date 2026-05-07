import SecondaryHeading from '@/components/ui/SecondaryHeading';
import AppSection from '@/layouts/SectionLayout';
import { cn } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';
import type { FC } from 'preact/compat';
import ServiceList from './ServiceList';

const Services: FC<{ className?: string }> = ({ className }) => {
    return (
        <AppSection
            className={cn(
                'relative isolate xl:flex xl:items-center xl:gap-21 xl:px-0 2xl:gap-16',
                className,
            )}
        >
            <ServicesInfo />
            <ServiceList />
        </AppSection>
    );
};

export default Services;

const ServicesInfo = () => {
    return (
        <div class="mb-18 sm:mb-20.5 lg:mx-auto lg:max-w-155 xl:mx-0 xl:mb-0 xl:max-w-123.5 2xl:max-w-187">
            <SecondaryHeading
                key={`${locale.value}-heading`}
                className="motion-safe:animate-fade-in xl:text-5xl"
            >
                {locale.value === 'en' ? 'What I do' : 'Что я делаю'}
            </SecondaryHeading>

            <p
                key={`${locale.value}-description`}
                class="motion-safe:animate-fade-in mb-8 text-balance sm:mb-10 sm:text-lg lg:mb-12 xl:text-left xl:text-base 2xl:text-[1.325rem]"
            >
                {locale.value === 'en'
                    ? 'These are the types of services that I can provide my clients with. I specialize in fullstack development, as well as devops. If a project requires other types of services, I prefer to delegate them to my colleagues who are professionals in those areas.'
                    : 'Вот основные типы услуг, которые я оказываю клиентам. Я специалируюсь на разработке бэкэнда, фронтэнда, а также настройке серверов. Во всех остальных вопросах я предпочитаю взаимодействовать с коллегами, которые на них специализируются.'}
            </p>
        </div>
    );
};
