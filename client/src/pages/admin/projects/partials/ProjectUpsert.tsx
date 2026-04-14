import { Form } from '@/components/form/Form';
import { FormButtons } from '@/components/form/FormButtons';
import { FormImage } from '@/components/form/FormImage';
import { FormInput } from '@/components/form/FormInput';
import { FormTextArea } from '@/components/form/FormTextArea';
import { useFetch } from '@/hooks/useFetch';
import { buildFormData } from '@/lib/helpers/buildFormData';
import type { ProjectType } from '@/lib/types/models/projects';
import { useLocation } from 'preact-iso';
import type { FC } from 'preact/compat';
import { useMemo } from 'preact/hooks';
import { toast } from 'sonner';
import CategoryPicker from './CategoryPicker';
import useFetchStacks from '@/hooks/useFetchStacks';
import useFetchCategories from '@/hooks/useFetchCategories';
import { FormStackPicker } from './FormStackPicker';
import { FormMockupPicker } from './FormMockupPicker';

type ProjectUpsertState = {
    title_en: string;
    title_ru: string;
    description_en: string;
    description_ru: string;
    link: string;
    category_en: string;
    category_ru: string;
    technologies: string[];
    order: number;
    mockup: number;
    image: File | string | null;
    alt_en: string;
    alt_ru: string;
};

const validateProject = (
    values: ProjectUpsertState,
): Partial<Record<keyof ProjectUpsertState, string>> => {
    const errors: Partial<Record<keyof ProjectUpsertState, string>> = {};

    if (!values.title_en.trim()) errors.title_en = 'English title is required';
    if (!values.title_ru.trim()) errors.title_ru = 'Russian title is required';
    if (!values.description_en.trim())
        errors.description_en = 'English description is required';
    if (!values.description_ru.trim())
        errors.description_ru = 'Russian description is required';
    if (!values.link.trim()) errors.link = 'Link is required';
    if (!values.category_en.trim())
        errors.category_en = 'English category is required';
    if (!values.category_ru.trim())
        errors.category_ru = 'Russian category is required';
    if (!values.alt_en.trim()) errors.alt_en = 'English alt text is required';
    if (!values.alt_ru.trim()) errors.alt_ru = 'Russian alt text is required';

    return errors;
};

const ProjectUpsert: FC<{ project?: ProjectType }> = ({ project }) => {
    const { route } = useLocation();
    const { fetchData } = useFetch();

    const initialValues = useMemo<ProjectUpsertState>(
        () => ({
            title_en: project?.attr?.title?.en ?? '',
            title_ru: project?.attr?.title?.ru ?? '',
            description_en: project?.attr?.description?.en ?? '',
            description_ru: project?.attr?.description?.ru ?? '',
            link: project?.attr?.link ?? '',
            category_en: project?.attr?.category?.en ?? '',
            category_ru: project?.attr?.category?.ru ?? '',
            technologies: project?.attr?.stacks ?? [],
            order: project?.attr?.order ?? 100,
            mockup: 1,
            image: project?.image?.srcSet?.dk ?? null,
            alt_en: project?.image?.alt?.en ?? '',
            alt_ru: project?.image?.alt?.ru ?? '',
        }),
        [project],
    );

    async function submit(values: ProjectUpsertState) {
        const formData = buildFormData({
            ...values,
            ...(project && { _method: 'PUT' }),
        });

        await fetchData({
            url:
                project != null
                    ? `/admin/projects/${project.attr.slug}`
                    : '/admin/projects',
            method: 'POST',
            payload: formData,
            onSuccess: () => {
                route('/projects');
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
            validate={validateProject}
        >
            {({ values, setFieldValue }) => {
                const { stacks, loading: stacksLoading } = useFetchStacks();
                const {
                    categories,
                    loading: categoriesLoading,
                    errors: categoriesErrors,
                    invalidCategoryId,
                } = useFetchCategories({
                    categoryRu: values.category_ru as string,
                    categoryEn: values.category_en as string,
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
                            name="category_en"
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
                                setFieldValue('category_en', en);
                                setFieldValue('category_ru', ru);
                            }}
                        />
                        <FormInput
                            name="category_ru"
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
                                setFieldValue('category_en', en);
                                setFieldValue('category_ru', ru);
                            }}
                        />
                        <FormInput
                            name="order"
                            label="Order"
                            inputmode="numeric" pattern="\d*"
                            className="max-w-40 px-0 h-auto text-center text-3xl! tracking-[0.5em]"
                        />
                        <FormMockupPicker name="mockup" label="Mockup" />
                        <FormImage name="image" label="Project Image" />
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
