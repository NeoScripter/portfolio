import { Button } from "@/components/ui/Button";
import { useModal } from "@/context/ModalContext";

const HeroBio = () => {
    const { showModal } = useModal();

    return (
        <div class="md:mx-auto md:max-w-155 lg:mx-0">
            <h1 class="xs:text-4xl mb-5 text-3xl font-medium text-balance sm:mb-10 sm:text-6xl lg:text-5xl 2xl:text-6xl">
                Илья Андреев, веб-разработчик
            </h1>
            <p class="mb-8 text-balance sm:mb-10 sm:text-lg lg:mb-12 2xl:text-xl">
                с опытом создания full-stack приложений и глубокими знаниями
                паттернов проектирования, оптимизации и основных принципов
                программирования для написания чистого и надежного кода.
            </p>
            <Button
                class="text-foreground hover:ring-muted-foreground/40 focus-visible:ring-muted-foreground/40 border-muted-foreground hover:bg-zinc-700/20"
                onClick={() => (showModal.value = true)}
                variant="hero"
            >
                Нанять меня
            </Button>
        </div>
    );
};

export default HeroBio;
