import AnimatedUnderline from '@/components/ui/AnimatedUnderline';
import { Button } from '@/components/ui/Button';
import { useModal } from '@/context/ModalContext';
import { cn } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';

const HeroActions = () => {
    const { showModal } = useModal();
    const lang = locale.value === 'en' ? 'en' : 'ru';

    return (
        <nav
            class="xs:text-base flex flex-wrap items-center gap-x-3 gap-y-6 text-sm lg:gap-x-6 lg:text-lg xl:text-xl"
            aria-label="Основные действия"
        >
            <Button onClick={() => (showModal.value = true)} variant="hero">
                {lang === 'en' ? 'Hire me' : 'Нанять меня'}
            </Button>

            <a href="/about" class="group relative ml-5">
                {lang === 'en' ? 'About me' : 'Узнать больше'}
                <AnimatedUnderline className={cn('z-10 bg-white')} />
            </a>
        </nav>
    );
};

export default HeroActions;
