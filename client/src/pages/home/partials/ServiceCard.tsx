import { cn } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';
import type { FC } from 'preact/compat';
import type { ServiceType } from '../data';

const ServiceCard: FC<{ service: ServiceType; active: boolean }> = ({
    service,
    active,
}) => {
    const lang = locale.value === 'ru' ? 'ru' : 'en';
    const Icon = service.icon;

    return (
        <li
            class={cn(
                'bg-muted/85 border-accent-foreground/10 ease w-80 gap-8 rounded-xl border px-5 pt-8 pb-15 transition-opacity duration-500 ease-in select-none sm:w-96 sm:px-8 sm:py-10.5',
                !active && 'opacity-30',
            )}
        >
            <div class="mb-4.5">
                <Icon class="size-12" strokeWidth={1.5} />
            </div>
            <p
                key={`${lang}-heading`}
                class="motion-safe:animate-fade-in mb-6.5 text-xl font-semibold sm:text-[1.325rem]"
            >
                {service.title[lang]}
            </p>
            <p
                key={`${lang}-content`}
                class="motion-safe:animate-fade-in sm:text-xl"
            >
                {service.description[lang]}
            </p>
        </li>
    );
};

export default ServiceCard;
