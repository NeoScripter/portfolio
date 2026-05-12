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
                class="motion-safe:animate-fade-in mb-4 text-lg font-bold sm:mb-5 sm:text-2xl"
            >
                {service.title[lang]}
            </h3>
            <p
                key={`${lang}-content`}
                class="motion-safe:animate-fade-in"
            >
                {service.description[lang]}
            </p>
        </li>
    );
};

export default ServiceCard;
