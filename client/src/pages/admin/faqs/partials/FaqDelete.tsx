import DeleteConfirmation from '@/components/form/DeleteConfirmation';
import { useDeleteModal } from '@/context/DeleteModelContext';
import { useFetch } from '@/hooks/useFetch';
import FormLayout from '@/layouts/FormLayout';
import { API_BASE_URL } from '@/lib/const/api';
import { events } from '@/lib/const/events';
import { toast } from 'sonner';

const FaqDelete = () => {
    const { itemToDelete: faq } = useDeleteModal();

    const { fetchData, loading } = useFetch();

    async function submit() {
        if (faq.value == null) return;

        await fetchData({
            url: `${API_BASE_URL}faqs/${faq.value.id}`,
            method: 'DELETE',
            onSuccess: (data) => {
                faq.value = null;
                toast.success(data.message ?? 'Deleted!');
                window.dispatchEvent(new Event(events.FORM_SUCCESS_EVENT));
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
