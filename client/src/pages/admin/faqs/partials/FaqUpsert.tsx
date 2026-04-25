import { Form } from '@/components/form/Form';
import { FormButtons } from '@/components/form/FormButtons';
import { FormInput } from '@/components/form/FormInput';
import { FormTextArea } from '@/components/form/FormTextArea';
import { useFetch } from '@/hooks/useFetch';
import { API_BASE_URL } from '@/lib/const/api';
import type { ValidationRules } from '@/lib/helpers/validation';
import type { FaqType } from '@/lib/types/models/faqs';
import type { FC } from 'preact/compat';
import { useMemo } from 'preact/hooks';
import { toast } from 'sonner';

type FaqUpsertState = {
    title_en: string;
    title_ru: string;
    content_en: string;
    content_ru: string;
};

const validationRules: ValidationRules<FaqUpsertState> = {
    title_en: ['required'],
    title_ru: ['required'],
};

const FaqUpsert: FC<{ faq?: FaqType }> = ({ faq }) => {
    const { fetchData } = useFetch();

    const initialValues = useMemo<FaqUpsertState>(
        () => ({
            title_en: faq?.attr.title?.en ?? '',
            title_ru: faq?.attr.title?.ru ?? '',
            content_en: faq?.attr.content?.en ?? '',
            content_ru: faq?.attr.content?.ru ?? '',
        }),
        [faq],
    );

    const url = faq != null ? `${API_BASE_URL}faqs/${faq.id}` : `${API_BASE_URL}faqs`;
    const method = faq != null ? 'PUT' : 'POST';

    async function submit(values: FaqUpsertState) {
        await fetchData({
            url,
            method,
            payload: values,
            onSuccess: (data) => {
                toast.success(data.message ?? 'Success!');
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
            <FormInput name="title_en" label="Question (EN)" required />
            <FormInput name="title_ru" label="Question (RU)" required />
            <FormTextArea name="content_en" label="Answer (EN)" required />
            <FormTextArea name="content_ru" label="Answer (RU)" required />
            <FormButtons
                submitText={faq ? 'Update' : 'Create'}
                cancelLink="/admin/faqs"
                shouldBackup={true}
            />
        </Form>
    );
};

export default FaqUpsert;
