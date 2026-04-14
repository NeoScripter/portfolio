import { Form } from '@/components/form/Form';
import { FormButtons } from '@/components/form/FormButtons';
import { FormImage } from '@/components/form/FormImage';
import { FormInput } from '@/components/form/FormInput';
import { FormTextArea } from '@/components/form/FormTextArea';
import { FormWysiwyg } from '@/components/form/FormWysiwyg';
import { Button } from '@/components/ui/Button';
import { useDeleteModal } from '@/context/DeleteModelContext';
import { useFetch } from '@/hooks/useFetch';
import { buildFormData } from '@/lib/helpers/buildFormData';
import type { ModuleType } from '@/lib/types/models/module';
import type { FC } from 'preact/compat';
import { useMemo } from 'preact/hooks';
import { toast } from 'sonner';

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
    order: number;
    type: ModuleTypeOptions;
    first_image: File | string | null;
    second_image: File | string | null;
    first_alt_en: string;
    first_alt_ru: string;
    second_alt_en: string;
    second_alt_ru: string;
};

const validateModule = (
    values: ModuleUpsertState,
): Partial<Record<keyof ModuleUpsertState, string>> => {
    const errors: Partial<Record<keyof ModuleUpsertState, string>> = {};

    if (!values.heading_en.trim()) errors.heading_en = 'English title is required';
    if (!values.heading_ru.trim()) errors.heading_ru = 'Russian title is required';
    if (!values.body_en.trim()) errors.body_en = 'English content is required';
    if (!values.body_ru.trim()) errors.body_ru = 'Russian content is required';
    if (!values.type) errors.type = 'Layout type is required';

    if (values.type !== 'only_text') {
        if (!values.first_alt_en.trim()) errors.first_alt_en = 'English alt text is required';
        if (!values.first_alt_ru.trim()) errors.first_alt_ru = 'Russian alt text is required';
    }

    if (values.type === 'two_image_split' || values.type === 'two_image_block') {
        if (!values.second_alt_en.trim()) errors.second_alt_en = 'English alt text is required';
        if (!values.second_alt_ru.trim()) errors.second_alt_ru = 'Russian alt text is required';
    }

    return errors;
};

const ModuleUpsert: FC<{ module?: ModuleType; projectId: number }> = ({
    module,
    projectId,
}) => {
    const { fetchData } = useFetch();
    const { itemToDelete } = useDeleteModal();

    const initialValues = useMemo<ModuleUpsertState>(
        () => ({
            project_id: projectId,
            heading_en: module?.attr?.heading?.en ?? '',
            heading_ru: module?.attr?.heading?.ru ?? '',
            body_en: module?.attr?.body?.en ?? '',
            body_ru: module?.attr?.body?.ru ?? '',
            order: module?.attr?.order ?? 1,
            type: module?.attr?.type ?? 'only_text',
            first_image: module?.firstImage?.srcSet.dk ?? null,
            second_image: module?.secondImage?.srcSet.dk ?? null,
            first_alt_en: module?.firstImage?.alt?.en ?? '',
            first_alt_ru: module?.firstImage?.alt?.ru ?? '',
            second_alt_en: module?.secondImage?.alt?.en ?? '',
            second_alt_ru: module?.secondImage?.alt?.ru ?? '',
        }),
        [module, projectId],
    );

    async function submit(values: ModuleUpsertState) {
        const formData = buildFormData({
            ...values,
            ...(module && { _method: 'PUT' }),
        });

        await fetchData({
            url: module != null
                ? `/admin/project-modules/${module.id}`
                : '/admin/project-modules',
            method: 'POST',
            payload: formData,
            onSuccess: () => {
                toast.success('Success!');
                document.dispatchEvent(new Event('itemDeleted'));
            },
            onError: () => toast.error('Error'),
        });
    }

    return (
        <Form
            initialValues={initialValues}
            onSubmit={submit}
            className="space-y-6"
            validate={validateModule}
        >
            {({ values }) => (
                <>
                    <FormInput name="heading_en" label="Title (EN)" required />
                    <FormInput name="heading_ru" label="Title (RU)" required />
                    <FormWysiwyg name="body_en" label="Content (EN)" required />
                    <FormWysiwyg name="body_ru" label="Content (RU)" required />
                    <FormLayoutPicker name="type" />
                    <FormInput
                        name="order"
                        label="Order"
                        type="number"
                        className="max-w-40 px-0 [&>input]:h-auto [&>input]:text-center [&>input]:text-3xl! [&>input]:tracking-[0.5em]"
                    />

                    {(values.type as ModuleTypeOptions) !== 'only_text' && (
                        <>
                            <FormImage name="first_image" label="First Image" />
                            <FormTextArea name="first_alt_en" label="First Alt (EN)" required />
                            <FormTextArea name="first_alt_ru" label="First Alt (RU)" required />
                        </>
                    )}

                    {(values.type === 'two_image_split' || values.type === 'two_image_block') && (
                        <>
                            <FormImage name="second_image" label="Second Image" />
                            <FormTextArea name="second_alt_en" label="Second Alt (EN)" required />
                            <FormTextArea name="second_alt_ru" label="Second Alt (RU)" required />
                        </>
                    )}

                    <FormButtons
                        submitText={module ? 'Update' : 'Create'}
                        shouldBackup={true}
                    >
                        {/* {module && ( */}
                        {/*     <Button */}
                        {/*         type="button" */}
                        {/*         onClick={() => (itemToDelete.value = module)} */}
                        {/*         variant="destructive" */}
                        {/*     > */}
                        {/*         Delete */}
                        {/*     </Button> */}
                        {/* )} */}
                    </FormButtons>
                </>
            )}
        </Form>
    );
};

export default ModuleUpsert;
