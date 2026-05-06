import HeroLayout from '@/layouts/HeroLayout';
import { locale } from '@/signals/locale';

const Hero = () => {
    const lang = locale.value === 'ru' ? 'ru' : 'en';

    return (
        <HeroLayout>
            <div class="mt-4 lg:mt-0">
                <div class="text-center md:mx-auto md:max-w-4/5">
                    <h1
                        key={`${lang}-heading`}
                        class="xs:text-4xl motion-safe:animate-fade-in mb-5 text-3xl font-medium text-balance sm:mb-10 sm:text-6xl lg:text-5xl 2xl:text-6xl"
                    >
                        {lang === 'ru' ? 'Мои проекты' : 'My projects'}
                    </h1>
                    <p
                        key={`${lang}-intro`}
                        class="motion-safe:animate-fade-in text-balance sm:text-lg 2xl:text-xl"
                    >
                        {lang === 'ru'
                            ? 'На этой странице представлены некоторые из проектов, над которыми я работал и (как правило, создавал с нуля). При переходе на отдельную страницу каждого проекты вы можете ознакомиться с историей того, как я его создавал, с какими трудностями столкнулся во время его выполнения, посмотреть скриншоты готового сайта, а также перейти по ссылке на него, если она есть. Для вашего удобства вы можете воспользоваться поиском для нахождения нужного вам стэка или тематики проекта. Приятного просмотра! :-)'
                            : "These are some of the projects that I have created or worked out throughout my career. Each project page describes the details of the project, the difficulties that I faced while working on it (there are usually a lot, that's what makes the job interesting :-). It also includes project screenshots and a link to the website if it is online (sometimes it is not :-(). For your convenience, you can use the search bar to sort projects based on your interests. I hope you enjoy! :-)"}
                    </p>
                </div>
            </div>
        </HeroLayout>
    );
};

export default Hero;
