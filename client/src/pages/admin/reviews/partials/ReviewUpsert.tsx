import { Form } from '@/components/form/Form';
import { FormButtons } from '@/components/form/FormButtons';
import { FormImage } from '@/components/form/FormImage';
import { FormInput } from '@/components/form/FormInput';
import { FormTextArea } from '@/components/form/FormTextArea';
import { useFetch } from '@/hooks/useFetch';
import { API_BASE_URL } from '@/lib/const/api';
import { events } from '@/lib/const/events';
import { buildFormData } from '@/lib/helpers/buildFormData';
import type { ValidationRules } from '@/lib/helpers/validation';
import type { ReviewType } from '@/lib/types/models/reviews';
import { useLocation } from 'preact-iso';
import type { FC } from 'preact/compat';
import { useMemo } from 'preact/hooks';
import { toast } from 'sonner';

type ReviewUpsertState = {
    name_en: string;
    name_ru: string;
    content_en: string;
    content_ru: string;
    alt_en: string;
    alt_ru: string;
    image: File | null;
};

const validationRules: ValidationRules<ReviewUpsertState> = {
    name_en: ['required'],
    name_ru: ['required'],
    alt_en: ['required'],
    alt_ru: ['required'],
    content_en: ['required'],
    content_ru: ['required'],
};

const ReviewUpsert: FC<{ review?: ReviewType }> = ({ review }) => {
    const { route } = useLocation();
    const { fetchData } = useFetch();

    const initialValues = useMemo<ReviewUpsertState>(
        () => ({
            name_en: review?.attr?.author?.en ?? '',
            name_ru: review?.attr?.author?.ru ?? '',
            content_en: review?.attr?.description?.en ?? '',
            content_ru: review?.attr?.description?.ru ?? '',
            alt_en: review?.image?.alt?.en ?? '',
            alt_ru: review?.image?.alt?.ru ?? '',
            image: null,
        }),
        [review],
    );

    const isEdit = review != null;

    async function submit(values: ReviewUpsertState) {
        const formData = buildFormData({
            ...values,
            ...(review && { _method: 'PUT' }),
        });

        await fetchData({
            url: isEdit
                ? `${API_BASE_URL}reviews/${review.id}`
                : `${API_BASE_URL}reviews`,
            method: 'POST',
            payload: formData,
            onSuccess: (data) => {
                if (!isEdit) {
                    route('/admin/reviews');
                }
                toast.success(data.message ?? 'Success!');
                window.dispatchEvent(new Event(events.FORM_SUCCESS_EVENT));
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
            hasFile={true}
        >
            <FormInput name="name_en" label="Author (EN)" required />
            <FormInput name="name_ru" label="Author (RU)" required />
            <FormTextArea name="content_en" label="Review (EN)" required />
            <FormTextArea name="content_ru" label="Review (RU)" required />
            <FormImage
                src={review?.image?.srcSet?.mb}
                label="Review Image"
                name="image"
            />
            <FormTextArea name="alt_en" label="Alt Text (EN)" required />
            <FormTextArea name="alt_ru" label="Alt Text (RU)" required />
            <FormButtons
                submitText={review ? 'Update' : 'Create'}
                cancelLink="/admin/reviews"
                shouldBackup={true}
            />
        </Form>
    );
};

export default ReviewUpsert;
