import DeleteConfirmation from '@/components/form/DeleteConfirmation';
import { useDeleteModal } from '@/context/DeleteModelContext';
import { useFetch } from '@/hooks/useFetch';
import FormLayout from '@/layouts/FormLayout';
import { events } from '@/lib/const/events';
import { toast } from 'sonner';

const ModuleDelete = () => {
    const { itemToDelete: module } = useDeleteModal();

    const { fetchData, loading } = useFetch();

    async function submit() {
        if (module.value == null) return;

        await fetchData({
            url: `/admin/project-modules/${module.value.id}`,
            method: 'DELETE',
            onSuccess: () => {
                module.value = null;
                toast.success('Deleted!');
                window.dispatchEvent(new Event(events.FORM_SUCCESS_EVENT));
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
