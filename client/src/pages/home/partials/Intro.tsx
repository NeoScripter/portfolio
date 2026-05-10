import SecondaryHeading from '@/components/ui/SecondaryHeading';
import AppSection from '@/layouts/SectionLayout';
import { locale } from '@/signals/locale';
import Reviews from './Reviews';

const Intro = () => {
    return (
        <AppSection className="full-bleed full-bleed-wrapper">
            <SecondaryHeading>
                {locale.value === 'en'
                    ? 'Unique and professional websites made with love'
                    : 'Уникальные и профессиональные сайты, сделанные с душой'}
            </SecondaryHeading>

            <p
                key={`${locale.value}-description`}
                class="motion-safe:animate-fade-in max-w-208"
            >
                {locale.value === 'en'
                    ? "Whenever I work, I always try to deliver the best result possible so that my clients and the users of their websites feel happy to use the product. Here are some of my clients' reviews"
                    : 'При работе над сайтом я всегда стараюсь достичь наилучшего результата, дабы потом клиент и пользователи его сайта получали радость от его использования. Вот мнения клиентов о результате моей работы.'}
            </p>

            <Reviews />
        </AppSection>
    );
};

export default Intro;
