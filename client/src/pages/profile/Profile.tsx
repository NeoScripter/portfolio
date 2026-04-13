import SubHeader from '@/components/ui/SubHeader';
import { useFetch } from '@/hooks/useFetch';
import AdminLayout from '@/layouts/AdminLayout';
import ProfileLayout from '@/layouts/ProfileLayout';
import { currentUser } from '@/signals/auth';
import type { TargetedEvent } from 'preact';
import { toast } from 'sonner';

interface State {
    name: string;
    email: string;
}

type Action =
    | { type: 'SET_NAME'; payload: string }
    | { type: 'SET_EMAIL'; payload: string };

const initialState: State = {
    name: currentUser.value?.name || '',
    email: currentUser.value?.email || '',
};

export default function Profile() {
    const { fetchData, resentlySuccessful, loading, errors } = useFetch();

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

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                class="mt-1 block w-full"
                                value={state.name}
                                required
                                autoComplete="name"
                                placeholder="Full name"
                                onInput={(e) =>
                                    dispatch({
                                        type: 'SET_NAME',
                                        payload: (e.target as HTMLInputElement)
                                            .value,
                                    })
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors?.name?.[0] || ''}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>

                            <Input
                                id="email"
                                type="email"
                                class="mt-1 block w-full"
                                value={state.email}
                                required
                                autoComplete="username"
                                placeholder="Email address"
                                onInput={(e) =>
                                    dispatch({
                                        type: 'SET_EMAIL',
                                        payload: (e.target as HTMLInputElement)
                                            .value,
                                    })
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors?.email?.[0] || ''}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={loading}>Save</Button>

                            {resentlySuccessful && (
                                <p className="text-sm text-neutral-600">
                                    Saved
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </ProfileLayout>
        </AdminLayout>
    );
}
