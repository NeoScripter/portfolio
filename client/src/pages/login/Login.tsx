import Checkbox from '@/components/form/Checkbox';
import Input from '@/components/form/Input';
import InputError from '@/components/form/InputError';
import Label from '@/components/form/Label';
import PasswordInput from '@/components/form/PasswordInput';
import AppTitle from '@/components/layout/AppTitle';
import { AuthButton } from '@/components/ui/AuthButton';
import { useFetch } from '@/hooks/useFetch';
import AuthLayout from '@/layouts/AuthLayout';
import { LoaderCircle } from 'lucide-preact';
import type { TargetedEvent } from 'preact';
import { useLocation } from 'preact-iso';
import { useReducer } from 'preact/hooks';
import { toast } from 'sonner';

interface State {
    email: string;
    password: string;
    remember: boolean;
}

type Action =
    | { type: 'SET_PASSWORD'; payload: string }
    | { type: 'SET_EMAIL'; payload: string }
    | { type: 'TOGGLE_REMEMBER' };

const initialState: State = {
    email: 'test@gmail.com',
    password: 'password',
    remember: false,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'SET_PASSWORD':
            return { ...state, password: action.payload };
        case 'TOGGLE_REMEMBER':
            return { ...state, remember: !state.remember };
        default:
            throw new Error('Unexpected action type');
    }
}

const Login = () => {
    const { route } = useLocation();

    const [state, dispatch] = useReducer(reducer, initialState);

    const { fetchData, loading, errors } = useFetch();

    async function submit(e: TargetedEvent<HTMLFormElement, Event>) {
        e.preventDefault();

        await fetchData({
            url: '/login',
            method: 'POST',
            payload: state,
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

            <form class="flex flex-col gap-6" onSubmit={submit}>
                <div class="grid gap-6">
                    {/* Email */}

                    <div class="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={state.email}
                            onInput={(e) =>
                                dispatch({
                                    type: 'SET_EMAIL',
                                    payload: (e.target as HTMLInputElement)
                                        .value,
                                })
                            }
                            placeholder="email@example.com"
                        />
                        <InputError message={errors?.email?.[0] || ''} />
                    </div>

                    {/* Password */}

                    <div class="grid gap-2">
                        <div class="flex items-center">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <PasswordInput
                            id="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={state.password}
                            onInput={(e) =>
                                dispatch({
                                    type: 'SET_PASSWORD',
                                    payload: (e.target as HTMLInputElement)
                                        .value,
                                })
                            }
                            placeholder="Password"
                        />
                        <InputError message={errors?.password?.[0] || ''} />
                    </div>

                    {/* Remember me */}
                    <div class="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={state.remember}
                            onClick={() =>
                                dispatch({ type: 'TOGGLE_REMEMBER' })
                            }
                            tabIndex={3}
                        />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>

                    {/* Submit */}
                    <AuthButton
                        type="submit"
                        class="mt-4 w-full"
                        tabIndex={4}
                        disabled={loading}
                    >
                        {loading && (
                            <LoaderCircle class="h-4 w-4 animate-spin" />
                        )}
                        Log in
                    </AuthButton>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Login;
