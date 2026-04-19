import DeleteConfirmation from '@/components/form/DeleteConfirmation';
import { useDeleteModal } from '@/context/DeleteModelContext';
import { useFetch } from '@/hooks/useFetch';
import FormLayout from '@/layouts/FormLayout';
import { PREFIX } from '@/lib/const/api';
import { toast } from 'sonner';

const FaqDelete = () => {
    const { itemToDelete: faq } = useDeleteModal();

    const { fetchData, loading } = useFetch();

    async function submit() {
        if (faq.value == null) return;

        await fetchData({
            url: `${PREFIX}faqs/${faq.value.id}`,
            method: 'DELETE',
            onSuccess: (data) => {
                faq.value = null;
                toast.success(data.message ?? 'Deleted!');
                document.dispatchEvent(new Event('itemDeleted'));
            },
            onError: () => toast.error('Error'),
        });
    }

    return (
        <FormLayout onSubmit={submit}>
            <DeleteConfirmation
                itemName="FAQ"
                onCancel={() => (faq.value = null)}
                loading={loading}
            />
        </FormLayout>
    );
};

export default FaqDelete;
