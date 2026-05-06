import Ellipse from '@/assets/svgs/Ellipse';
import Mail from '@/assets/svgs/Mail';
import { useModal } from '@/context/ModalContext';
import useThrottle from '@/hooks/useThrottle';
import { playAudio } from '@/lib/helpers/playAudio';
import { cn } from '@/lib/helpers/utils';
import type { RouteMatch } from '@/lib/types/shared';
import { PhoneCall } from 'lucide-preact';
import type { ComponentChildren } from 'preact';
import { useRoute } from 'preact-iso';
import { type FC } from 'preact/compat';
import Webform from '../shared/Webform';
import { Button } from '../ui/Button';

const AppFooter: FC<{ className?: string }> = ({ className }) => {
    const { showModal } = useModal();
    const { component } = useRoute() as RouteMatch;

    if (component.name === 'NotFound') {
        return null;
    }

    return (
        <footer
            inert={showModal.value}
            class={cn(
                'lg:flex lg:items-center lg:justify-between lg:gap-12 xl:gap-24 2xl:gap-40',
                className,
            )}
        >
            <FooterInfo />

            <div class="hidden max-w-220 flex-1 lg:mt-8 lg:block lg:pr-6 lg:pb-10 xl:mt-14 xl:pr-0 xl:pb-20 2xl:mr-auto">
                <Webform />
            </div>
        </footer>
    );
};

export default AppFooter;

const FooterInfo = () => {
    const { showModal } = useModal();

    const handleClick = () => {
        playAudio('click');
        showModal.value = true;
    };

    return (
        <div class="bg-footer-bg text-footer-text relative isolate overflow-clip rounded-t-md px-10 pt-10 pb-7 sm:px-14 sm:pb-10 lg:w-125 lg:pb-11 lg:pl-10 xl:w-150 xl:pt-15 xl:pr-8 xl:pl-18">
            <ArtLayer />

            <h3 class="mb-4 text-4xl font-bold text-white sm:text-5xl xl:mb-6">
                Контакты
            </h3>
            <p class="sm:mr-10 sm:text-lg xl:text-[1.325rem]">
                Всегда рад ответить на любые ваши вопросы
            </p>

            <Button
                onClick={handleClick}
                variant="footer"
                class="mt-7 rounded-2xl sm:mt-6 lg:mt-19 lg:hidden"
            >
                Форма для связи
            </Button>

            <FooterLink
                className="mt-23 sm:mt-10 lg:mt-19"
                label="+63 950 464 35 91"
                href="tel:+639504643591"
                onMouseEnter={() => playAudio('call')}
            >
                <PhoneCall class="group-hover:motion-safe:animate-wiggle size-full" />
            </FooterLink>

            <FooterLink
                className="mt-3.5 sm:mt-4.5"
                label="ask@ilyaandreev.dev"
                href="mailto:ask@ilyaandreev.dev"
                onMouseEnter={() => playAudio('email')}
            >
                <Mail className="size-full" />
            </FooterLink>

            <p class="mt-15 sm:mt-13 lg:mt-50 xl:text-right xl:text-lg">
                © Илья Андреев, {new Date().getFullYear()}. Все права защищены
            </p>
        </div>
    );
};

const FooterLink: FC<{
    className?: string;
    label: string;
    href: string;
    children: ComponentChildren;
    onMouseEnter: () => void;
}> = ({ className, label, href, children, onMouseEnter }) => {
    const throttledMouseEnter = useThrottle(onMouseEnter, 1500);

    return (
        <a
            target="_blank"
            href={href}
            class={cn(
                'ease group flex items-center gap-5 transition-colors duration-300 hover:text-white sm:gap-6 sm:text-xl xl:text-[1.325rem]',
                className,
            )}
            onMouseEnter={throttledMouseEnter}
        >
            <div class="size-5 shrink-0 sm:size-6 xl:size-7">{children}</div>
            <span>{label}</span>
        </a>
    );
};

const ArtLayer = () => {
    return (
        <div
            class="absolute -right-1/4 -bottom-1/8 size-67.5 sm:-right-1/10"
            aria-hidden="true"
        >
            <Ellipse />
            <div
                class="absolute -top-1/5 -left-1/5 size-38 translate-1/5"
                aria-hidden="true"
            >
                <Ellipse />
            </div>
        </div>
    );
};
