
import DeleteConfirmation from '@/components/form/DeleteConfirmation';
import { useDeleteModal } from '@/context/DeleteModelContext';
import { useFetch } from '@/hooks/useFetch';
import FormLayout from '@/layouts/FormLayout';
import { toast } from 'sonner';

const ProjectDelete = () => {
    const { itemToDelete: project } = useDeleteModal();

    const { fetchData, loading } = useFetch();

    async function submit() {
        if (project.value == null) return;

        await fetchData({
            url: `/admin/projects/${project.value.attr.slug}`,
            method: 'DELETE',
            onSuccess: () => {
                project.value = null;
                toast.success('Deleted!');
                document.dispatchEvent(new Event('itemDeleted'));
            },
            onError: () => toast.error('Error'),
        });
    }

    return (
        <FormLayout onSubmit={submit}>
            <DeleteConfirmation
                itemName="project"
                onCancel={() => (project.value = null)}
                loading={loading}
            />
        </FormLayout>
    );
};

export default ProjectDelete;
