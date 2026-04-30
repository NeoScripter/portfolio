import { Form } from '@/components/form/Form';
import { FormButtons } from '@/components/form/FormButtons';
import { FormPasswordInput } from '@/components/form/FormPasswordInput';
import AppTitle from '@/components/layout/AppTitle';
import SubHeader from '@/components/ui/SubHeader';
import { useFetch } from '@/hooks/useFetch';
import AdminLayout from '@/layouts/AdminLayout';
import ProfileLayout from '@/layouts/ProfileLayout';
import type { ValidationRules } from '@/lib/helpers/validation';
import { toast } from 'sonner';

type State = {
    current_password: string;
    password: string;
    password_confirmation: string;
};

const validationRules: ValidationRules<State> = {
    current_password: ['required'],
    password: ['required', 'min'],
    password_confirmation: ['required', 'min'],
};

const initialValues: State = {
    current_password: '',
    password: '',
    password_confirmation: '',
};

export default function Password() {
    const { fetchData } = useFetch();

    async function submit(values: State) {
        await fetchData({
            url: '/settings/password',
            method: 'PUT',
            payload: values,
            onSuccess: (data) =>
                toast.success(data.message || 'Password updated successfully'),
            onError: () => toast.error('Failed to update password'),
        });
    }

    return (
        <AdminLayout
            title={{ en: 'Password settings', ru: 'Настройки пароля' }}
        >
            <ProfileLayout>
                <AppTitle
                    titleRu="Password settings"
                    titleEn="Изменение пароля"
                />
                <div className="space-y-6">
                    <SubHeader
                        title={{
                            en: 'Update password',
                            ru: 'Изменить пароль',
                        }}
                        description={{
                            en: 'Ensure your account is using a long, random password to stay secure',
                            ru: 'Используйте длинный случайный пароль для безопасности аккаунта',
                        }}
                        className="[&>h3,&>p]:animate-none"
                    />
                    <AppTitle
                        titleRu="Настройки пароля"
                        titleEn="Password Settings"
                    />
                    <Form
                        initialValues={initialValues}
                        onSubmit={submit}
                        className="space-y-6"
                        rules={validationRules}
                    >
                        <FormPasswordInput
                            name="current_password"
                            label="Current password"
                            required
                        />
                        <FormPasswordInput
                            name="password"
                            label="New password"
                            required
                        />
                        <FormPasswordInput
                            name="password_confirmation"
                            label="Confirm password"
                            required
                        />
                        <FormButtons submitText="Save password" />
                    </Form>
                </div>
            </ProfileLayout>
        </AdminLayout>
    );
}
