import { Form } from '@/components/form/Form';
import { FormButtons } from '@/components/form/FormButtons';
import { FormCheckbox } from '@/components/form/FormCheckbox';
import { FormInput } from '@/components/form/FormInput';
import { FormPasswordInput } from '@/components/form/FormPasswordInput';
import AppTitle from '@/components/layout/AppTitle';
import { useFetch } from '@/hooks/useFetch';
import AuthLayout from '@/layouts/AuthLayout';
import { useLocation } from 'preact-iso';
import { toast } from 'sonner';

interface State {
    email: string;
    password: string;
    remember: boolean;
}

const validateLogin = (values: State): Partial<Record<keyof State, string>> => {
    const errors: Partial<Record<keyof State, string>> = {};

    if (!values.email.trim()) {
        errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password.trim()) {
        errors.password = 'Password is required';
    } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
    }

    return errors;
};

const Login = () => {
    const { route } = useLocation();

    const { fetchData, loading, errors } = useFetch();

    async function submit(values: State) {
        await fetchData({
            url: '/login',
            method: 'POST',
            payload: values,
            onSuccess: () => route('/dashboard'),
            onError: () => toast.error('Login failed'),
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
                    email: 'test@gmail.com',
                    password: 'password',
                    remember: false,
                }}
                onSubmit={submit}
                className="flex flex-col gap-6"
                validate={validateLogin}
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
