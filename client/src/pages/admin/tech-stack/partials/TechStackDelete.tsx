import DeleteConfirmation from '@/components/form/DeleteConfirmation';
import { useDeleteModal } from '@/context/DeleteModelContext';
import { useFetch } from '@/hooks/useFetch';
import FormLayout from '@/layouts/FormLayout';
import { API_BASE_URL } from '@/lib/const/api';
import { events } from '@/lib/const/events';
import { toast } from 'sonner';

const TechStackDelete = () => {
    const { itemToDelete: stack } = useDeleteModal();

    const { fetchData, loading } = useFetch();

    async function submit() {
        if (stack.value == null) return;

        await fetchData({
            url: `${API_BASE_URL}tech-stacks/${stack.value.id}`,
            method: 'DELETE',
            onSuccess: (data) => {
                stack.value = null;
                toast.success(data.message ?? 'Deleted!');
                window.dispatchEvent(new Event(events.FORM_SUCCESS_EVENT));
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
