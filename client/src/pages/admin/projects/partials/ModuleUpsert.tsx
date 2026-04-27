import { Form } from '@/components/form/Form';
import { FormButtons } from '@/components/form/FormButtons';
import { FormImage } from '@/components/form/FormImage';
import { FormInput } from '@/components/form/FormInput';
import { FormTextArea } from '@/components/form/FormTextArea';
import { FormWysiwyg } from '@/components/form/FormWysiwyg';
import { useDeleteModal } from '@/context/DeleteModelContext';
import { useFetch } from '@/hooks/useFetch';
import { API_BASE_URL } from '@/lib/const/api';
import { events } from '@/lib/const/events';
import { buildFormData } from '@/lib/helpers/buildFormData';
import type { ValidationRules } from '@/lib/helpers/validation';
import type { ModuleType } from '@/lib/types/models/module';
import type { FC } from 'preact/compat';
import { toast } from 'sonner';
import { FormLayoutPicker } from './FormLayoutPicker';

export type ModuleTypeOptions =
    | 'only_text'
    | 'two_image_split'
    | 'two_image_block'
    | 'one_image_split';

type ModuleUpsertState = {
    project_id: number;
    heading_en: string;
    heading_ru: string;
    body_en: string;
    body_ru: string;
    priority: number;
    type: ModuleTypeOptions;
    first_image: File | string | null;
    second_image: File | string | null;
    first_alt_en: string;
    first_alt_ru: string;
    second_alt_en: string;
    second_alt_ru: string;
};

const validationRules: ValidationRules<ModuleUpsertState> = {
    heading_en: ['required'],
    heading_ru: ['required'],
    body_en: ['required'],
    body_ru: ['required'],
    type: ['required'],
};

const ModuleUpsert: FC<{ module?: ModuleType; projectId: number }> = ({
    module,
    projectId,
}) => {
    const { fetchData } = useFetch();
    const { itemToDelete } = useDeleteModal();

    const isEdit = module != null;

    const initialValues = {
        project_id: projectId,
        heading_en: module?.attr?.heading?.en ?? '',
        heading_ru: module?.attr?.heading?.ru ?? '',
        body_en: module?.attr?.body?.en ?? '',
        body_ru: module?.attr?.body?.ru ?? '',
        priority: module?.attr?.priority ?? 1,
        type: module?.attr?.type ?? 'only_text',
        first_image: null,
        second_image: null,
        first_alt_en: module?.firstImage?.alt?.en ?? '',
        first_alt_ru: module?.firstImage?.alt?.ru ?? '',
        second_alt_en: module?.secondImage?.alt?.en ?? '',
        second_alt_ru: module?.secondImage?.alt?.ru ?? '',
    };

    async function submit(values: ModuleUpsertState) {
        const formData = buildFormData({
            ...values,
            ...(module && { _method: 'PUT' }),
        });

        await fetchData({
            url: isEdit
                ? `${API_BASE_URL}modules/${module.id}`
                : `${API_BASE_URL}modules`,
            method: 'POST',
            payload: formData,
            onSuccess: (data) => {
                toast.success(data.message ?? 'Success!');
                window.dispatchEvent(new Event(events.UPDATE_MODULE_EVENT));
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
        >
            {({ values }) => (
                <>
                    <FormInput name="heading_en" label="Title (EN)" required />
                    <FormInput name="heading_ru" label="Title (RU)" required />
                    <FormWysiwyg name="body_en" label="Content (EN)" required />
                    <FormWysiwyg name="body_ru" label="Content (RU)" required />
                    <FormLayoutPicker name="type" label="Layout" required />
                    <FormInput
                        name="priority"
                        label="Priority"
                        required
                        inputmode="numeric"
                        pattern="\d*"
                        className="h-auto max-w-40 px-0 text-center text-3xl! tracking-[0.5em]"
                    />

                    {(values.type as ModuleTypeOptions) !== 'only_text' && (
                        <>
                            <FormImage
                                name="first_image"
                                src={module?.firstImage?.srcSet.tb}
                                label="First Image"
                            />
                            <FormTextArea
                                name="first_alt_en"
                                label="First Alt (EN)"
                                required
                            />
                            <FormTextArea
                                name="first_alt_ru"
                                label="First Alt (RU)"
                                required
                            />
                        </>
                    )}

                    {(values.type === 'two_image_split' ||
                        values.type === 'two_image_block') && (
                        <>
                            <FormImage
                                name="second_image"
                                label="Second Image"
                                src={module?.secondImage?.srcSet.tb}
                            />
                            <FormTextArea
                                name="second_alt_en"
                                label="Second Alt (EN)"
                                required
                            />
                            <FormTextArea
                                name="second_alt_ru"
                                label="Second Alt (RU)"
                                required
                            />
                        </>
                    )}

                    <FormButtons
                        submitText={module ? 'Update' : 'Create'}
                        shouldBackup={true}
                        onDelete={() => {
                            itemToDelete.value = module;
                        }}
                    />
                </>
            )}
        </Form>
    );
};

export default ModuleUpsert;
