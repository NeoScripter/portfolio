import { Form } from '@/components/form/Form';
import { FormButtons } from '@/components/form/FormButtons';
import { FormImage } from '@/components/form/FormImage';
import { FormInput } from '@/components/form/FormInput';
import { FormTextArea } from '@/components/form/FormTextArea';
import { useFetch } from '@/hooks/useFetch';
import useFetchCategories from '@/hooks/useFetchCategories';
import useFetchStacks from '@/hooks/useFetchStacks';
import { API_BASE_URL } from '@/lib/const/api';
import { events } from '@/lib/const/events';
import { buildFormData } from '@/lib/helpers/buildFormData';
import { type ValidationRules } from '@/lib/helpers/validation';
import type { ProjectType } from '@/lib/types/models/projects';
import { useLocation } from 'preact-iso';
import type { FC } from 'preact/compat';
import { toast } from 'sonner';
import CategoryPicker from './CategoryPicker';
import { FormMockupPicker } from './FormMockupPicker';
import { FormStackPicker } from './FormStackPicker';

type ProjectUpsertState = {
    title_en: string;
    title_ru: string;
    description_en: string;
    description_ru: string;
    link: string;
    name_en: string;
    name_ru: string;
    technologies: string[];
    display_order: number;
    mockup: number;
    image: File | null;
    alt_en: string;
    alt_ru: string;
};

const validationRules: ValidationRules<ProjectUpsertState> = {
    name_en: ['required'],
    name_ru: ['required'],
    title_en: ['required'],
    title_ru: ['required'],
    link: ['required'],
    description_en: ['required'],
    description_ru: ['required'],
    alt_en: ['required'],
    alt_ru: ['required'],
};

const ProjectUpsert: FC<{ project?: ProjectType }> = ({ project }) => {
    const { route } = useLocation();
    const { fetchData } = useFetch();

    const isEdit = project != null;

    const initialValues: ProjectUpsertState = {
        title_en: project?.attr?.title?.en ?? '',
        title_ru: project?.attr?.title?.ru ?? '',
        description_en: project?.attr?.description?.en ?? '',
        description_ru: project?.attr?.description?.ru ?? '',
        link: project?.attr?.link ?? '',
        name_en: project?.attr?.category?.en ?? '',
        name_ru: project?.attr?.category?.ru ?? '',
        technologies: project?.attr?.stacks ?? [],
        display_order: project?.attr.display_order ?? 100,
        mockup: isEdit ? project.attr.mockup : 1,
        image: null,
        alt_en: project?.image?.alt?.en ?? '',
        alt_ru: project?.image?.alt?.ru ?? '',
    };

    async function submit(values: ProjectUpsertState) {
        const formData = buildFormData({
            ...values,
            ...(project && { _method: 'PUT' }),
        });

        await fetchData({
            url:
                project != null
                    ? `${API_BASE_URL}projects/${project.attr.slug}`
                    : `${API_BASE_URL}projects`,
            method: 'POST',
            payload: formData,
            onSuccess: (data) => {
                // route('/admin/projects');
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
            {({ values, setFieldValue }) => {
                const { stacks, loading: stacksLoading } = useFetchStacks();
                const {
                    categories,
                    loading: categoriesLoading,
                    errors: categoriesErrors,
                    invalidCategoryId,
                } = useFetchCategories({
                    categoryRu: values.name_ru as string,
                    categoryEn: values.name_en as string,
                });

                return (
                    <>
                        <FormInput
                            name="title_en"
                            label="Title (EN)"
                            required
                        />
                        <FormInput
                            name="title_ru"
                            label="Title (RU)"
                            required
                        />
                        <FormTextArea
                            name="description_en"
                            label="Description (EN)"
                            required
                        />
                        <FormTextArea
                            name="description_ru"
                            label="Description (RU)"
                            required
                        />
                        <FormInput name="link" label="Link" required />
                        <FormStackPicker
                            name="technologies"
                            label="Stacks"
                            availableStacks={stacks.map((s) => s.name)}
                            loading={stacksLoading}
                        />
                        <FormInput
                            name="name_en"
                            label="Category (EN)"
                            required
                        />
                        <CategoryPicker
                            categories={categories}
                            loading={categoriesLoading}
                            errors={categoriesErrors}
                            invalidId={invalidCategoryId}
                            locale="en"
                            onSelect={({ en, ru }) => {
                                setFieldValue('name_en', en);
                                setFieldValue('name_ru', ru);
                            }}
                        />
                        <FormInput
                            name="name_ru"
                            label="Category (RU)"
                            required
                        />
                        <CategoryPicker
                            categories={categories}
                            loading={categoriesLoading}
                            errors={categoriesErrors}
                            invalidId={invalidCategoryId}
                            locale="ru"
                            onSelect={({ en, ru }) => {
                                setFieldValue('name_en', en);
                                setFieldValue('name_ru', ru);
                            }}
                        />
                        <FormInput
                            name="display_order"
                            label="Order"
                            inputmode="numeric"
                            pattern="\d*"
                            className="h-auto max-w-40 px-0 text-center text-3xl! tracking-[0.5em]"
                        />
                        <FormMockupPicker name="mockup" label="Mockup" />
                        <FormImage
                            name="image"
                            src={project?.image?.srcSet?.dk}
                            label="Project Image"
                        />
                        <FormTextArea
                            name="alt_en"
                            label="Alt Text (EN)"
                            required
                        />
                        <FormTextArea
                            name="alt_ru"
                            label="Alt Text (RU)"
                            required
                        />
                        <FormButtons
                            submitText={project ? 'Update' : 'Create'}
                            cancelLink="/admin/projects"
                            shouldBackup={true}
                        />
                    </>
                );
            }}
        </Form>
    );
};

export default ProjectUpsert;
