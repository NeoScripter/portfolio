import { Form } from '@/components/form/Form';
import { FormButtons } from '@/components/form/FormButtons';
import { FormImage } from '@/components/form/FormImage';
import { FormTextArea } from '@/components/form/FormTextArea';
import { FormWysiwyg } from '@/components/form/FormWysiwyg';
import { useFetch } from '@/hooks/useFetch';
import { API_BASE_URL } from '@/lib/const/api';
import { events } from '@/lib/const/events';
import { buildFormData } from '@/lib/helpers/buildFormData';
import type { ValidationRules } from '@/lib/helpers/validation';
import type { TechStackType } from '@/lib/types/models/tech-stack';
import { useLocation } from 'preact-iso';
import type { FC } from 'preact/compat';
import { toast } from 'sonner';

type TechStackUpsertState = {
    body_en: string;
    body_ru: string;
    alt_en: string;
    alt_ru: string;
    image: File | null;
};

const validationRules: ValidationRules<TechStackUpsertState> = {
    // url: ['required'],
    // body_ru: ['required'],
    // alt_en: ['required'],
    // alt_ru: ['required'],
};

const TechStackUpsert: FC<{ stack?: TechStackType }> = ({ stack }) => {
    const { fetchData } = useFetch();
    const { route } = useLocation();

    const initialValues = {
        body_en: stack?.attr?.body?.en ?? '',
        body_ru: stack?.attr?.body?.ru ?? '',
        alt_en: stack?.image?.alt?.en ?? '',
        alt_ru: stack?.image?.alt?.ru ?? '',
        image: null,
    };

    const isEdit = stack != null;

    async function submit(values: TechStackUpsertState) {
        const formData = buildFormData({
            ...values,
            ...(stack && { _method: 'PUT' }),
        });

        await fetchData({
            url: isEdit
                ? `${API_BASE_URL}tech-stacks/${stack.id}`
                : `${API_BASE_URL}tech-stacks`,
            method: 'POST',
            payload: formData,
            onSuccess: (data) => {
                toast.success(data.message ?? 'Success!');
                window.dispatchEvent(new Event(events.FORM_SUCCESS_EVENT));
                if (!isEdit) {
                    route('/admin/stacks');
                }
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
            <FormWysiwyg name="body_en" label="Stack (EN)" />
            <FormWysiwyg name="body_ru" label="Stack (RU)" />
            <FormImage
                name="image"
                src={stack?.image?.srcSet?.mb}
                label="Stack Image"
            />
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
