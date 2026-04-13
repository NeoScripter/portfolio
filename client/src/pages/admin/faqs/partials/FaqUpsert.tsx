import { Form } from '@/components/form/Form';
import { FormButtons } from '@/components/form/FormButtons';
import { FormInput } from '@/components/form/FormInput';
import { FormTextArea } from '@/components/form/FormTextArea';
import { useFetch } from '@/hooks/useFetch';
import type { FaqType } from '@/lib/types/models/faqs';
import { useLocation } from 'preact-iso';
import type { FC } from 'preact/compat';
import { useMemo } from 'preact/hooks';
import { toast } from 'sonner';

type FaqUpsertState = {
    title_en: string;
    title_ru: string;
    content_en: string;
    content_ru: string;
};

const validateFaq = (
    values: FaqUpsertState,
): Partial<Record<keyof FaqUpsertState, string>> => {
    const errors: Partial<Record<keyof FaqUpsertState, string>> = {};

    if (!values.title_en.trim())
        errors.title_en = 'English question is required';
    if (!values.title_ru.trim())
        errors.title_ru = 'Russian question is required';
    if (!values.content_en.trim())
        errors.content_en = 'English answer is required';
    if (!values.content_ru.trim())
        errors.content_ru = 'Russian answer is required';

    return errors;
};

const FaqUpsert: FC<{ faq?: FaqType }> = ({ faq }) => {
    const { route } = useLocation();
    const { fetchData } = useFetch();

    const initialValues = useMemo<FaqUpsertState>(
        () => ({
            title_en: faq?.attr.title?.en ?? '',
            title_ru: faq?.attr.title?.ru ?? '',
            content_en: faq?.attr.description?.en ?? '',
            content_ru: faq?.attr.description?.ru ?? '',
        }),
        [faq],
    );

    const url = faq != null ? `/admin/faqs/${faq.id}` : '/admin/faqs';
    const method = faq != null ? 'PUT' : 'POST';

    async function submit(values: FaqUpsertState) {
        await fetchData({
            url,
            method,
            payload: values,
            onSuccess: () => {
                route('/faqs');
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
            validate={validateFaq}
        >
            <FormInput name="title_en" label="Question (EN)" required />
            <FormInput name="title_ru" label="Question (RU)" required />
            <FormTextArea name="content_en" label="Answer (EN)" required />
            <FormTextArea name="content_ru" label="Answer (RU)" required />
            <FormButtons
                submitText={faq ? 'Update' : 'Create'}
                cancelLink="/faqs"
            />
        </Form>
    );
};

export default FaqUpsert;
