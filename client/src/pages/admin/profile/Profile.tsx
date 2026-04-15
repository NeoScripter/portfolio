import { Form } from '@/components/form/Form';
import { FormButtons } from '@/components/form/FormButtons';
import { FormInput } from '@/components/form/FormInput';
import AppTitle from '@/components/layout/AppTitle';
import SubHeader from '@/components/ui/SubHeader';
import { useFetch } from '@/hooks/useFetch';
import AdminLayout from '@/layouts/AdminLayout';
import ProfileLayout from '@/layouts/ProfileLayout';
import type { ValidationRules } from '@/lib/helpers/validation';
import { currentUser } from '@/signals/auth';
import { toast } from 'sonner';

type State = {
    name: string;
    email: string;
}

const validationRules: ValidationRules<State> = {
    email: ['required', 'email'],
    name: ['required'],
};

export default function Profile() {
    const { fetchData } = useFetch();

    async function submit(values: State) {
        await fetchData({
            url: '/settings/profile',
            method: 'PATCH',
            payload: values,
            onSuccess: (data) => {
                currentUser.value = data.user;
                toast.success(data.message);
            },
            onError: () => toast.error('Login failed'),
        });
    }

    return (
        <AdminLayout title={{ en: 'Profile settings', ru: 'Данные профиля' }}>
            <AppTitle titleEn="Profile settings" titleRu="Данные профиля" />
            <ProfileLayout>
                <div className="space-y-6">
                    <SubHeader
                        title={{
                            en: 'Profile information',
                            ru: 'Данные профиля',
                        }}
                        description={{
                            en: 'Update your name and email address',
                            ru: 'Редактировать емаил или имя пользователя',
                        }}
                    />

                    <AppTitle titleRu="Настройки профиля" titleEn="Profile Settings" />

                    <Form
                        initialValues={{
                            name: currentUser.value?.name || '',
                            email: currentUser.value?.email || '',
                        }}
                        onSubmit={submit}
                        className="space-y-6"
                        rules={validationRules}
                    >
                        <FormInput
                            name="name"
                            label="Full name"
                            type="text"
                            required
                        />
                        <FormInput
                            name="email"
                            label="Email Address"
                            type="email"
                            required
                        />

                        <FormButtons submitText="Save" />
                    </Form>
                </div>
            </ProfileLayout>
        </AdminLayout>
    );
}
