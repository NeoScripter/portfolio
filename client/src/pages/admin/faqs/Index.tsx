import AdminShellNav from '@/components/layout/AdminShellNav';
import AppTitle from '@/components/layout/AppTitle';
import { DeleteModalProvider } from '@/context/DeleteModelContext';
import useFetchRecords from '@/hooks/useFetchRecords';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import DeleteModalLayout from '@/layouts/DeleteModalLayout';
import { API_BASE_URL } from '@/lib/const/api';
import { hasErrorDetails, range } from '@/lib/helpers/utils';
import type { FaqType } from '@/lib/types/models/faqs';
import FaqCard, { FaqCardSkeleton } from './partials/FaqCard';
import FaqDelete from './partials/FaqDelete';

const Faqs = () => {
    const {
        data: faqs,
        loading,
        errors,
    } = useFetchRecords<FaqType[]>({
        url: `${API_BASE_URL}faqs`,
    });

    if (hasErrorDetails(errors)) {
        console.error(errors);
    }

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
                            {faqs && faqs.length > 0 ? (
                                faqs.map((faq) => (
                                    <FaqCard key={faq.id} faq={faq} />
                                ))
                            ) : (
                                <p>You haven't added any faqs yet</p>
                            )}
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
