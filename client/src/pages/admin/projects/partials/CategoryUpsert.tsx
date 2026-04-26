import { Form } from '@/components/form/Form';
import { FormButtons } from '@/components/form/FormButtons';
import { FormInput } from '@/components/form/FormInput';
import { useFetch } from '@/hooks/useFetch';
import { API_BASE_URL } from '@/lib/const/api';
import { type ValidationRules } from '@/lib/helpers/validation';
import type { CategoryType } from '@/lib/types/models/projects';
import type { FC } from 'preact/compat';
import { toast } from 'sonner';

type CategoryUpsertState = {
    name_en: string;
    name_ru: string;
};

const validationRules: ValidationRules<CategoryUpsertState> = {
    name_en: ['required'],
    name_ru: ['required'],
};

const CategoryCreate: FC<{ project?: CategoryType }> = ({ project }) => {
    const { fetchData } = useFetch();

    const initialValues: CategoryUpsertState = {
        name_en: '',
        name_ru: '',
    };

    async function submit(values: CategoryUpsertState) {
        await fetchData({
            url: `${API_BASE_URL}categories`,
            method: 'POST',
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
            className="space-y-4"
            rules={validationRules}
        >
            <FormInput name="name_en" label="Name (EN)" required />
            <FormInput name="name_ru" label="Name (RU)" required />
            <FormButtons
                submitText={'Create'}
            />
        </Form>
    );
};

export default CategoryCreate;
