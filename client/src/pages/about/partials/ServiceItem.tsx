import { cn } from "@/lib/helpers/utils";
import type { ServiceType } from "@/pages/home/data";
import { locale } from "@/signals/locale";
import type { FC } from "preact/compat";

const ServiceItem: FC<{
    service: ServiceType;
    active: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    fadingIn: boolean;
    fadingOut: boolean;
    slidingUp1: boolean;
    slidingUp2: boolean;
}> = ({
    service,
    active,
    onMouseEnter,
    onMouseLeave,
    fadingIn,
    fadingOut,
    slidingUp1,
    slidingUp2,
}) => {
    const lang = locale.value === 'ru' ? 'ru' : 'en';

    return (
        <li
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            class={cn(
                'bg-user-background ring-accent-foreground/15 rounded-md px-8 py-9.5 ring-1 transition-[shadow,scale,border] sm:p-8',
                {
                    'shadow-video border-foreground scale-102 border-l-4':
                        active,
                    'animate-fade-in': fadingIn,
                    'animate-fade-out': fadingOut,
                    'slide-up-1': slidingUp1,
                    'slide-up-2': slidingUp2,
                },
            )}
        >
            <h4 class="mb-3 text-2xl font-bold 2xl:text-2xl">
                {service.title[lang]}
            </h4>
            <p class="xl:text-base 2xl:text-lg max-w-[calc(100%-5px)]">
                {service.description[lang]}
            </p>
        </li>
    );
};

export default ServiceItem;
