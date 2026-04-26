import AdminShellNav from '@/components/layout/AdminShellNav';
import AppTitle from '@/components/layout/AppTitle';
import { DeleteModalProvider } from '@/context/DeleteModelContext';
import { useFetch } from '@/hooks/useFetch';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import DeleteModalLayout from '@/layouts/DeleteModalLayout';
import { range } from '@/lib/helpers/utils';
import type { FaqType } from '@/lib/types/models/faqs';
import { useEffect, useState } from 'preact/hooks';
import FaqCard, { FaqCardSkeleton } from './partials/FaqCard';
import FaqDelete from './partials/FaqDelete';
import { API_BASE_URL } from '@/lib/const/api';
import { events } from '@/lib/const/events';

const Faqs = () => {
    const { fetchData, loading } = useFetch();
    const [faqs, setFaqs] = useState<FaqType[] | null>(null);

    useEffect(() => {
        const fetchFaqs = () => {
            fetchData({
                url: API_BASE_URL + 'faqs',
                onSuccess: (data) => {
                    setFaqs(data.data);
                },
                onError: (err) => console.error(err.message),
            });
        };

        fetchFaqs();

        document.addEventListener(events.FORM_SUCCESS_EVENT, fetchFaqs);

        return () => document.removeEventListener(events.FORM_SUCCESS_EVENT, fetchFaqs);
    }, []);

    return (
        <DeleteModalProvider>
            <AdminLayout title={{ en: 'Faqs', ru: 'Часто задаваемые вопросы' }}>
                <AppTitle titleEn="FAQs" titleRu="FAQs" />
                <AdminShellLayout>
                    <AdminShellNav href={'faqs/create'} />
                    {loading ? (
                        <ul className="space-y-6">
                            {range(0, 8).map((idx) => (
                                <FaqCardSkeleton key={idx} />
                            ))}
                        </ul>
                    ) : (
                        <ul className="space-y-6">
                            {faqs &&
                                faqs.map((faq) => (
                                    <FaqCard key={faq.id} faq={faq} />
                                ))}
                        </ul>
                    )}
                    <DeleteModalLayout>
                        <FaqDelete />
                    </DeleteModalLayout>
                </AdminShellLayout>
            </AdminLayout>
        </DeleteModalProvider>
    );
};

export default Faqs;
