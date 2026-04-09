import AnimatedUnderline from '@/components/ui/AnimatedUnderline';
import { Button } from '@/components/ui/Button';
import { useModal } from '@/context/ModalContext';
import { cn } from '@/lib/helpers/utils';

const HeroActions = () => {
    const { showModal } = useModal();

    return (
        <nav
            class="xs:text-base flex flex-wrap items-center gap-x-3 gap-y-6 text-sm lg:gap-x-6 lg:text-lg xl:text-xl"
            aria-label="Основные действия"
        >
            <Button onClick={() => (showModal.value = true)} variant="hero">
                Нанять меня
            </Button>

            <a href="/about" class="group relative ml-5">
                Узнать больше
                <AnimatedUnderline className={cn('z-10 bg-white')} />
            </a>
        </nav>
    );
};

export default HeroActions;
