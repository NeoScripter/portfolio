import { Form } from '@/components/form/Form';
import { FormButtons } from '@/components/form/FormButtons';
import { FormImage } from '@/components/form/FormImage';
import { FormInput } from '@/components/form/FormInput';
import { FormTextArea } from '@/components/form/FormTextArea';
import { useFetch } from '@/hooks/useFetch';
import { buildFormData } from '@/lib/helpers/buildFormData';
import type { ValidationRules } from '@/lib/helpers/validation';
import type { VideoType } from '@/lib/types/models/videos';
import { useLocation } from 'preact-iso';
import type { FC } from 'preact/compat';
import { useMemo } from 'preact/hooks';
import { toast } from 'sonner';

type VideoUpsertState = {
    title_en: string;
    title_ru: string;
    url: string;
    alt_en: string;
    alt_ru: string;
    image: File | string | null;
};

const validationRules: ValidationRules<VideoUpsertState> = {
    title_en: ['required'],
    title_ru: ['required'],
    alt_en: ['required'],
    alt_ru: ['required'],
    url: ['required'],
};

const VideoUpsert: FC<{ video?: VideoType }> = ({ video }) => {
    const { route } = useLocation();
    const { fetchData } = useFetch();

    const initialValues = useMemo<VideoUpsertState>(
        () => ({
            title_en: video?.attr?.title?.en ?? '',
            title_ru: video?.attr?.title?.ru ?? '',
            url: video?.attr?.url ?? '',
            alt_en: video?.image?.alt?.en ?? '',
            alt_ru: video?.image?.alt?.ru ?? '',
            image: video?.image?.srcSet?.dk ?? null,
        }),
        [video],
    );

    async function submit(values: VideoUpsertState) {
        const formData = buildFormData({
            ...values,
            ...(video && { _method: 'PUT' }),
        });

        await fetchData({
            url: video != null ? `/admin/videos/${video.id}` : '/admin/videos',
            method: 'POST',
            payload: formData,
            onSuccess: () => {
                route('/videos');
                toast.success('Success!');
            },
            onError: () => toast.error('Error'),
        });
    }

    return (
        <Form
            initialValues={initialValues}
            onSubmit={submit}
            className="space-y-6"
            rules={validationRules}
        >
            <FormInput name="title_en" label="Title (EN)" required />
            <FormInput name="title_ru" label="Title (RU)" required />
            <FormInput name="url" label="URL" required />
            <FormImage name="image" label="Video Image" />
            <FormTextArea name="alt_en" label="Alt Text (EN)" required />
            <FormTextArea name="alt_ru" label="Alt Text (RU)" required />
            <FormButtons
                submitText={video ? 'Update' : 'Create'}
                cancelLink="/admin/videos"
                shouldBackup={true}
            />
        </Form>
    );
};

export default VideoUpsert;
