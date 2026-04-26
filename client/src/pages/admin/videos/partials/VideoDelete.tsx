import DeleteConfirmation from '@/components/form/DeleteConfirmation';
import { useDeleteModal } from '@/context/DeleteModelContext';
import { useFetch } from '@/hooks/useFetch';
import FormLayout from '@/layouts/FormLayout';
import { API_BASE_URL } from '@/lib/const/api';
import { events } from '@/lib/const/events';
import { toast } from 'sonner';

const VideoDelete = () => {
    const { itemToDelete: video } = useDeleteModal();

    const { fetchData, loading } = useFetch();

    async function submit() {
        if (video.value == null) return;

        await fetchData({
            url: `${API_BASE_URL}videos/${video.value.id}`,
            method: 'DELETE',
            onSuccess: (data) => {
                video.value = null;
                toast.success(data.message ?? 'Deleted!');
                window.dispatchEvent(new Event(events.FORM_SUCCESS_EVENT));
            },
            onError: () => toast.error('Error'),
        });
    }

    return (
        <FormLayout onSubmit={submit}>
            <DeleteConfirmation
                itemName="video"
                onCancel={() => (video.value = null)}
                loading={loading}
            />
        </FormLayout>
    );
};

export default VideoDelete;
