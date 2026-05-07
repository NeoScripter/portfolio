import AdaptiveImg from '@/components/ui/AdaptiveImg';
import HeroLayout from '@/layouts/HeroLayout';
import { heroBgSrcSet } from '../data';
import HeroAvatar from './HeroAvatar';
import HeroBio from './HeroBio';

const Hero = () => {
    return (
        <HeroLayout>
            <AdaptiveImg
                prtClass="-inset-1 -z-5"
                variant="bg"
                srcs={heroBgSrcSet}
            />

            <div class="mt-4 gap-x-2 md:gap-x-8 lg:mt-0 lg:flex lg:items-start lg:justify-between 2xl:items-center">
                <HeroAvatar />
                <HeroBio />
            </div>
        </HeroLayout>
    );
};

export default Hero;
