import { cn } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';
import type { FC } from 'preact/compat';
import type { ServiceType } from '../data';

const ServiceCard: FC<{ service: ServiceType; active: boolean }> = ({
    service,
    active,
}) => {
    const lang = locale.value === 'ru' ? 'ru' : 'en';

    return (
        <li
            class={cn(
                'bg-muted/85 border-accent-foreground/10 ease w-80 gap-8 rounded-xl border px-5 pt-8 pb-15 transition-opacity duration-500 ease-in select-none sm:w-96 sm:px-8 sm:py-10.5',
                !active && 'opacity-30',
            )}
        >
            <h3
                key={`${lang}-heading`}
                class="motion-safe:animate-fade-in mb-3.5 text-lg font-bold md:text-xl lg:mb-4.5 lg:text-[1.325rem]"
            >
                {service.title[lang]}
            </h3>
            <p
                key={`${lang}-content`}
                class="motion-safe:animate-fade-in sm:text-base lg:text-xl"
            >
                {service.description[lang]}
            </p>
        </li>
    );
};

export default ServiceCard;
