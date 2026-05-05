import AdaptiveImg from "@/components/ui/AdaptiveImg";
import { locale } from "@/signals/locale";
import { heroAvatarSrcSet } from "../data";

const HeroAvatar = () => {
    const avatarAlt =
        locale.value === 'en'
            ? 'Мужчина в очках с короткими светлыми волосами смотрит в камеру и слегка улыбается.'
            : 'Man with short light hair and glasses looking at the camera with a slight smile.';

    return (
        <div class="relative isolate mx-auto mb-16 w-fit sm:mb-20 md:mb-24 lg:order-2 lg:mx-0 lg:mb-0 xl:mx-auto">
            <AdaptiveImg
                prtClass="max-w-75 2xl:max-w-95 rounded-3xl aspect-[1/1.1] w-[55vw]"
                srcs={heroAvatarSrcSet}
                alt={avatarAlt}
            />
            <div
                aria-hidden="true"
                class="bg-muted-foreground/20 absolute inset-0 top-[10%] -bottom-[10%] left-[12%] -z-5 size-full rounded-3xl backdrop-blur-sm lg:top-[8%] lg:-right-[8%] lg:-bottom-[8%] lg:left-[8%]"
            />
        </div>
    );
};

export default HeroAvatar;
