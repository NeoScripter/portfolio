import AdminShellNav from '@/components/layout/AdminShellNav';
import { DeleteModalProvider } from '@/context/DeleteModelContext';
import { useFetch } from '@/hooks/useFetch';
import AdminLayout from '@/layouts/AdminLayout';
import AdminShellLayout from '@/layouts/AdminShellLayout';
import ModalLayout from '@/layouts/ModalLayout';
import { range } from '@/lib/helpers/utils';
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
                url: '/api/stacks.json?latest=true',
                onSuccess: (data) => {
                    setStacks(data.data);
                },
            });
        };

        fetchStacks();

        document.addEventListener('itemDeleted', fetchStacks);

        return () => document.removeEventListener('itemDeleted', fetchStacks);
    }, []);

    if (errors != null) {
        console.error(errors);
    }

    return (
        <DeleteModalProvider>
            <AdminLayout title={{ en: 'Stacks', ru: 'Навыки' }}>
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
                            {stacks &&
                                stacks.map((stack) => (
                                    <TechStackCard
                                        key={stack.id}
                                        stack={stack}
                                    />
                                ))}
                        </ul>
                    )}
                    <ModalLayout className="max-w-9/10 px-10 py-14 sm:max-w-100 lg:max-w-160">
                        <TechStackDelete />
                    </ModalLayout>
                </AdminShellLayout>
            </AdminLayout>
        </DeleteModalProvider>
    );
};

export default Index;
