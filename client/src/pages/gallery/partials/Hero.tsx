import HeroLayout from '@/layouts/HeroLayout';

const Hero = () => {
    return (
        <HeroLayout>
            <div class="mt-4 lg:mt-0">
                <div class="text-center md:mx-auto md:max-w-4/5">
                    <h1 class="xs:text-4xl mb-5 text-3xl font-medium text-balance sm:mb-10 sm:text-6xl lg:text-5xl 2xl:text-6xl">
                        Все проекты
                    </h1>
                    <p class="text-balance sm:text-lg 2xl:text-xl">
                        Здесь представлены мои проекты, а также информация о
                        моем опыте и профессиональной деятельности. Я подробно
                        рассказываю, как создавался каждый проект, и описываю
                        ключевые этапы работы. Если вы заинтересованы в
                        сотрудничестве, буду рад обсудить создание вашего
                        проекта. Спасибо, что заглянули, надеюсь, вам понравится
                        мое портфолио!
                    </p>
                </div>
            </div>
        </HeroLayout>
    );
};

export default Hero;
