import DeleteConfirmation from '@/components/form/DeleteConfirmation';
import { useDeleteModal } from '@/context/DeleteModelContext';
import { useFetch } from '@/hooks/useFetch';
import FormLayout from '@/layouts/FormLayout';
import { toast } from 'sonner';

const ReviewDelete = () => {
    const { itemToDelete: review } = useDeleteModal();

    const { fetchData, loading } = useFetch();

    async function submit() {
        if (review.value == null) return;

        await fetchData({
            url: `/admin/reviews/${review.value.id}`,
            method: 'DELETE',
            onSuccess: () => {
                review.value = null;
                toast.success('Deleted!');
                document.dispatchEvent(new Event('itemDeleted'));
            },
            onError: () => toast.error('Error'),
        });
    }

    return (
        <FormLayout onSubmit={submit}>
            <DeleteConfirmation
                itemName="review"
                onCancel={() => (review.value = null)}
                loading={loading}
            />
        </FormLayout>
    );
};

export default ReviewDelete;
