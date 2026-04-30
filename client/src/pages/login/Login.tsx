import { Form } from '@/components/form/Form';
import { FormButtons } from '@/components/form/FormButtons';
import { FormCheckbox } from '@/components/form/FormCheckbox';
import { FormInput } from '@/components/form/FormInput';
import { FormPasswordInput } from '@/components/form/FormPasswordInput';
import AppTitle from '@/components/layout/AppTitle';
import { useFetch } from '@/hooks/useFetch';
import AuthLayout from '@/layouts/AuthLayout';
import { API_BASE_URL } from '@/lib/const/api';
import type { ValidationRules } from '@/lib/helpers/validation';
import { currentUser } from '@/signals/auth';
import { useLocation } from 'preact-iso';
import { toast } from 'sonner';

type State = {
    email: string;
    password: string;
    remember: boolean;
};

const validationRules: ValidationRules<State> = {
    email: ['required', 'email'],
    password: ['required', 'min'],
};

const Login = () => {
    const { route } = useLocation();

    const { fetchData } = useFetch();

    async function submit(values: State) {
        await fetchData({
            url: `${API_BASE_URL}login`,
            method: 'POST',
            payload: values,
            onSuccess: (data) => {
                toast.success(data.message ?? 'Welcome back!');
                const user = data.user;
                user.expires_at = data.expires_at;

                currentUser.value = user;
                route('/admin/');
            },
            onError: (err) => {
                toast.error('Login failed');
                console.error(err);
            },
        });
    }

    return (
        <AuthLayout
            title="Log in to your account"
            description="Enter your email and password below to log in"
        >
            <AppTitle titleRu="Вход" titleEn="Login" />

            <Form
                initialValues={{
                    email: '',
                    password: '',
                    remember: false,
                }}
                onSubmit={submit}
                className="flex flex-col gap-6"
                rules={validationRules}
            >
                <FormInput
                    name="email"
                    label="Email Address"
                    type="email"
                    required
                />
                <FormPasswordInput name="password" label="Password" required />
                <FormCheckbox name="remember" label="Remember me" />

                <FormButtons submitText="Log in" />
            </Form>
        </AuthLayout>
    );
};

export default Login;
