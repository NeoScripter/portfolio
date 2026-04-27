import AdminShellNav from '@/components/layout/AdminShellNav';
import AppTitle from '@/components/layout/AppTitle';
import { DeleteModalProvider } from '@/context/DeleteModelContext';
import { useFetch } from '@/hooks/useFetch';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import DeleteModalLayout from '@/layouts/DeleteModalLayout';
import { API_BASE_URL } from '@/lib/const/api';
import { events } from '@/lib/const/events';
import { hasErrorDetails, range } from '@/lib/helpers/utils';
import type { TechStackType } from '@/lib/types/models/tech-stack';
import { useEffect, useState } from 'preact/hooks';
import TechStackCard, { TechStackFallback } from './partials/TechStackCard';
import TechStackDelete from './partials/TechStackDelete';

const Index = () => {
    const { fetchData, loading, errors } = useFetch();
    const [stacks, setStacks] = useState<TechStackType[] | null>(null);

    useEffect(() => {
        const fetchStacks = () => {
            fetchData({
                url: `${API_BASE_URL}tech-stacks`,
                onSuccess: (data) => {
                    setStacks(data.data);
                },
            });
        };

        fetchStacks();

        window.addEventListener(events.FORM_SUCCESS_EVENT, fetchStacks);

        return () =>
            window.removeEventListener(events.FORM_SUCCESS_EVENT, fetchStacks);
    }, []);

    if (hasErrorDetails(errors)) {
        console.error(errors);
    }

    return (
        <DeleteModalProvider>
            <AdminLayout title={{ en: 'Stacks', ru: 'Навыки' }}>
                <AppTitle titleEn="Stacks" titleRu="Навыки" />
                <AdminShellLayout>
                    <AdminShellNav href={'/admin/stacks/create'} />
                    {loading ? (
                        <ul className="flex flex-wrap gap-6">
                            {range(0, 8).map((idx) => (
                                <TechStackFallback key={idx} />
                            ))}
                        </ul>
                    ) : (
                        <ul className="flex flex-wrap gap-6">
                            {stacks && stacks.length > 0 ? (
                                stacks.map((stack) => (
                                    <TechStackCard
                                        key={stack.id}
                                        stack={stack}
                                    />
                                ))
                            ) : (
                                <p>
                                    You haven't added any tech stacks yet
                                </p>
                            )}
                        </ul>
                    )}
                    <DeleteModalLayout>
                        <TechStackDelete />
                    </DeleteModalLayout>
                </AdminShellLayout>
            </AdminLayout>
        </DeleteModalProvider>
    );
};

export default Index;
