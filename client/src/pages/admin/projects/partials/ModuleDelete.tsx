import DeleteConfirmation from '@/components/form/DeleteConfirmation';
import { useDeleteModal } from '@/context/DeleteModelContext';
import { useFetch } from '@/hooks/useFetch';
import FormLayout from '@/layouts/FormLayout';
import { API_BASE_URL } from '@/lib/const/api';
import { events } from '@/lib/const/events';
import { toast } from 'sonner';

const ModuleDelete = () => {
    const { itemToDelete: module } = useDeleteModal();

    const { fetchData, loading } = useFetch();

    async function submit() {
        if (module.value == null) return;

        await fetchData({
            url: `${API_BASE_URL}modules/${module.value.id}`,
            method: 'DELETE',
            onSuccess: (data) => {
                module.value = null;
                toast.success(data.message ?? 'Deleted!');
                window.dispatchEvent(new Event(events.UPDATE_MODULE_EVENT));
            },
            onError: () => toast.error('Error'),
        });
    }

    return (
        <FormLayout onSubmit={submit}>
            <DeleteConfirmation
                itemName="module"
                onCancel={() => (module.value = null)}
                loading={loading}
            />
        </FormLayout>
    );
};

export default ModuleDelete;
