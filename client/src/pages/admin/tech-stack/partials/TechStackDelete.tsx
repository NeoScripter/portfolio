import DeleteConfirmation from '@/components/form/DeleteConfirmation';
import { useDeleteModal } from '@/context/DeleteModelContext';
import { useFetch } from '@/hooks/useFetch';
import FormLayout from '@/layouts/FormLayout';
import { PREFIX } from '@/lib/const/api';
import { toast } from 'sonner';

const TechStackDelete = () => {
    const { itemToDelete: stack } = useDeleteModal();

    const { fetchData, loading } = useFetch();

    async function submit() {
        if (stack.value == null) return;

        await fetchData({
            url: `${PREFIX}tech-stacks/${stack.value.id}`,
            method: 'DELETE',
            onSuccess: (data) => {
                stack.value = null;
                toast.success(data.message ?? 'Deleted!');
                document.dispatchEvent(new Event('itemDeleted'));
            },
            onError: () => toast.error('Error'),
        });
    }

    return (
        <FormLayout onSubmit={submit}>
            <DeleteConfirmation
                itemName="tech stack"
                onCancel={() => (stack.value = null)}
                loading={loading}
            />
        </FormLayout>
    );
};

export default TechStackDelete;
