import AnimatedUnderline from '@/components/ui/AnimatedUnderline';
import { Button } from '@/components/ui/Button';
import { useModal } from '@/context/ModalContext';
import { events } from '@/lib/const/events';
import { cn } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';

const HeroActions = () => {
    const { showModal } = useModal();
    const lang = locale.value === 'en' ? 'en' : 'ru';

    const handleClick = () => {
        window.dispatchEvent(
            new CustomEvent(events.CHANGE_FORM_STATUS, { detail: 'cancel' }),
        );
        showModal.value = true;
    };

    return (
        <nav
            class="xs:text-base flex flex-wrap items-center gap-x-3 gap-y-6 text-sm lg:gap-x-6 lg:text-lg xl:text-xl"
            aria-label="Основные действия"
        >
            <Button onClick={handleClick} variant="hero">
                <span class="motion-safe:animate-fade-in" key={`${lang}-hire-me`}>
                    {lang === 'en' ? 'Hire me' : 'Нанять меня'}
                </span>
            </Button>

            <a
                key={`${lang}-about-me`}
                href="/about"
                class="group relative ml-5 motion-safe:animate-fade-in"
            >
                {lang === 'en' ? 'About me' : 'Узнать больше'}
                <AnimatedUnderline className={cn('z-10 bg-white')} />
            </a>
        </nav>
    );
};

export default HeroActions;
