import ApiError from '@/components/ui/ApiError';
import SecondaryHeading from '@/components/ui/SecondaryHeading';
import { useFetch } from '@/hooks/useFetch';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import AppSection from '@/layouts/SectionLayout';
import { API_BASE_URL } from '@/lib/const/api';
import { cn, hasErrorDetails, range } from '@/lib/helpers/utils';
import type { FaqResource } from '@/lib/types/models/faqs';
import { locale } from '@/signals/locale';
import { useEffect, useState } from 'preact/hooks';
import FaqCard, { FaqFallback } from './FaqCard';

const Faqs = () => {
    const { fetchData, loading, errors } = useFetch();
    const [data, setData] = useState<FaqResource | null>(null);
    const [currentIdx, setCurrentIdx] = useState<number | null>(null);
    const [ref, isIntersecting] = useIntersectionObserver<HTMLUListElement>();

    const selectFaq = (idx: number) => {
        setCurrentIdx((prev) => (idx === prev ? null : idx));
    };

    useEffect(() => {
        fetchData({
            url: API_BASE_URL + 'faqs',
            onSuccess: (data) => {
                setData(data);
            },
        });
    }, []);

    const faqs = data?.data;

    if (hasErrorDetails(errors))
        return <ApiError resourceRu="FAQs" mb={true} resourceEn="FAQs" />;

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
                        {faqs
                            ? faqs?.map((faq, idx) => (
                                  <FaqCard
                                      isReached={isIntersecting}
                                      idx={idx}
                                      key={faq.id}
                                      open={idx === currentIdx}
                                      onClick={() => selectFaq(idx)}
                                      faq={faq}
                                  />
                              ))
                            : range(0, 5).map((skeleton) => (
                                  <FaqFallback
                                      key={`faq-skeleton-${skeleton}`}
                                  />
                              ))}
                    </ul>
                </div>
            </div>
        </AppSection>
    );
};

export default Faqs;
