import ApiError from '@/components/ui/ApiError';
import SecondaryHeading from '@/components/ui/SecondaryHeading';
import useFetchRecords from '@/hooks/useFetchRecords';
import type { ServerError } from '@/hooks/useForm';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import AppSection from '@/layouts/SectionLayout';
import { API_BASE_URL } from '@/lib/const/api';
import { playAudio } from '@/lib/helpers/playAudio';
import { cn, hasErrorDetails, range } from '@/lib/helpers/utils';
import type { FaqType } from '@/lib/types/models/faqs';
import { locale } from '@/signals/locale';
import type { ComponentChildren } from 'preact';
import type { FC } from 'preact/compat';
import { useState } from 'preact/hooks';
import FaqCard, { FaqFallback } from './FaqCard';

const Faqs = () => {
    const [currentIdx, setCurrentIdx] = useState<number | null>(null);
    const [ref, isIntersecting] = useIntersectionObserver<HTMLUListElement>();

    const selectFaq = (idx: number) => {
        setCurrentIdx((prev) => {
            playAudio('closeFaq');
            if (idx === prev) {
                return null;
            }

            playAudio('openFaq');
            return idx;
        });
    };
    const {
        data: faqs,
        loading,
        errors,
    } = useFetchRecords<FaqType[]>({
        url: `${API_BASE_URL}faqs`,
        shouldCache: true,
    });

    return (
        <AppSection>
            <SecondaryHeading>
                {locale.value === 'en' ? 'Часто задаваемые вопросы' : 'FAQs'}
            </SecondaryHeading>

            <div>
                <div className="relative mt-16 mb-40 sm:mt-19">
                    <ul
                        ref={ref}
                        className={cn(
                            'isolate grid items-start gap-7 lg:grid-cols-2 lg:gap-x-11',
                        )}
                    >
                        <StateResolver loading={loading} errors={errors}>
                            {faqs &&
                                faqs?.map((faq, idx) => (
                                    <FaqCard
                                        isReached={isIntersecting}
                                        idx={idx}
                                        key={faq.id}
                                        open={idx === currentIdx}
                                        onClick={() => selectFaq(idx)}
                                        faq={faq}
                                    />
                                ))}
                        </StateResolver>
                    </ul>
                </div>
            </div>
        </AppSection>
    );
};

export default Faqs;

const StateResolver: FC<{
    errors: ServerError | null;
    loading: boolean;
    children: ComponentChildren;
}> = ({ errors, loading, children }) => {
    if (loading) {
        return range(0, 5).map((skeleton) => (
            <FaqFallback key={`faq-skeleton-${skeleton}`} />
        ));
    }

    if (hasErrorDetails(errors)) {
        console.error(errors);
        return <ApiError resourceRu="FAQs" mb={true} resourceEn="FAQs" />;
    }

    return children;
};
