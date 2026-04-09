import SecondaryHeading from '@/components/ui/SecondaryHeading';
import AppSection from '@/layouts/SectionLayout';
import { cn, range } from '@/lib/helpers/utils';
import FaqCard, { FaqFallback } from './FaqCard';
import ApiError from '@/components/ui/ApiError';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useState } from 'preact/hooks';
import type { FaqResource } from '@/lib/types/models/faqs';

const Faqs = () => {
    // const { fetchData, loading, errors } = useFetch();
    const [data, setData] = useState<FaqResource | null>(null);
    const [currentIdx, setCurrentIdx] = useState<number | null>(null);
    const [ref, isIntersecting] = useIntersectionObserver<HTMLUListElement>();

    const selectFaq = (idx: number) => {
        setCurrentIdx((prev) => (idx === prev ? null : idx));
    };

    // useEffect(() => {
    //     fetchData({
    //         url: '/api/faqs',
    //         onSuccess: (data) => {
    //             setData(data);
    //         },
    //     });
    // }, []);

    const faqs = data?.data;
    let loading = true;

    // if (errors != null)
    //     return <ApiError resourceRu="ответы на вопросы" resourceEn="FAQs" />;

    return (
        <AppSection>
            <SecondaryHeading className="xl:mb-28">
                Ответы на вопросы
            </SecondaryHeading>

            <div>
                <div className="relative mt-16 mb-40 sm:mt-19">
                    <ul
                        ref={ref}
                        className={cn(
                            'isolate grid items-start gap-7 lg:grid-cols-2 lg:gap-x-11',
                        )}
                    >
                        {!loading
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
