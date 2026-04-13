import { Form } from '@/components/form/Form';
import { FormButtons } from '@/components/form/FormButtons';
import { FormImage } from '@/components/form/FormImage';
import { FormInput } from '@/components/form/FormInput';
import { FormTextArea } from '@/components/form/FormTextArea';
import { useFetch } from '@/hooks/useFetch';
import { buildFormData } from '@/lib/helpers/buildFormData';
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
    image: File | string | null;
};

const validateReview = (
    values: ReviewUpsertState,
): Partial<Record<keyof ReviewUpsertState, string>> => {
    const errors: Partial<Record<keyof ReviewUpsertState, string>> = {};

    if (!values.name_en.trim())
        errors.name_en = 'English author name is required';
    if (!values.name_ru.trim())
        errors.name_ru = 'Russian author name is required';
    if (!values.content_en.trim())
        errors.content_en = 'English review is required';
    if (!values.content_ru.trim())
        errors.content_ru = 'Russian review is required';
    if (!values.alt_en.trim()) errors.alt_en = 'English alt text is required';
    if (!values.alt_ru.trim()) errors.alt_ru = 'Russian alt text is required';

    return errors;
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
            image: review?.image?.srcSet?.dk ?? null,
        }),
        [review],
    );

    async function submit(values: ReviewUpsertState) {
        const formData = buildFormData({
            ...values,
            ...(review && { _method: 'PUT' }),
        });

        await fetchData({
            url:
                review != null
                    ? `/admin/reviews/${review.id}`
                    : '/admin/reviews',
            method: 'POST',
            payload: formData,
            onSuccess: () => {
                route('/reviews');
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
            validate={validateReview}
        >
            <FormInput name="name_en" label="Author (EN)" required />
            <FormInput name="name_ru" label="Author (RU)" required />
            <FormTextArea name="content_en" label="Review (EN)" required />
            <FormTextArea name="content_ru" label="Review (RU)" required />
            <FormImage
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
