import { Form } from '@/components/form/Form';
import { FormButtons } from '@/components/form/FormButtons';
import { FormImage } from '@/components/form/FormImage';
import { FormTextArea } from '@/components/form/FormTextArea';
import { FormWysiwyg } from '@/components/form/FormWysiwyg';
import { useFetch } from '@/hooks/useFetch';
import { buildFormData } from '@/lib/helpers/buildFormData';
import type { ValidationRules } from '@/lib/helpers/validation';
import type { TechStackType } from '@/lib/types/models/tech-stack';
import { useLocation } from 'preact-iso';
import type { FC } from 'preact/compat';
import { useMemo } from 'preact/hooks';
import { toast } from 'sonner';

type TechStackUpsertState = {
    body_en: string;
    body_ru: string;
    alt_en: string;
    alt_ru: string;
    image: File | string | null;
};

const validationRules: ValidationRules<TechStackUpsertState> = {
    body_en: ['required'],
    body_ru: ['required'],
    alt_en: ['required'],
    alt_ru: ['required'],
};

const TechStackUpsert: FC<{ stack?: TechStackType }> = ({ stack }) => {
    const { route } = useLocation();
    const { fetchData } = useFetch();

    const initialValues = useMemo<TechStackUpsertState>(
        () => ({
            body_en: stack?.attr?.body?.en ?? '',
            body_ru: stack?.attr?.body?.ru ?? '',
            alt_en: stack?.attr?.alt?.en ?? '',
            alt_ru: stack?.attr?.alt?.ru ?? '',
            image: stack?.attr?.url ?? null,
        }),
        [stack],
    );

    async function submit(values: TechStackUpsertState) {
        const formData = buildFormData({
            ...values,
            ...(stack && { _method: 'PUT' }),
        });

        await fetchData({
            url: stack != null ? `/admin/stacks/${stack.id}` : '/admin/stacks',
            method: 'POST',
            payload: formData,
            onSuccess: () => {
                route('/stacks');
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
            <FormWysiwyg name="body_en" label="Stack (EN)" required />
            <FormWysiwyg name="body_ru" label="Stack (RU)" required />
            <FormImage name="image" label="Stack Image" />
            <FormTextArea name="alt_en" label="Alt Text (EN)" required />
            <FormTextArea name="alt_ru" label="Alt Text (RU)" required />
            <FormButtons
                submitText={stack ? 'Update' : 'Create'}
                cancelLink="/admin/stacks"
                shouldBackup={true}
            />
        </Form>
    );
};

export default TechStackUpsert;
