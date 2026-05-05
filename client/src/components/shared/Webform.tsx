import type { FC } from 'preact/compat';

import { useFetch } from '@/hooks/useFetch';
import type { ServerError } from '@/hooks/useForm';
import { API_BASE_URL } from '@/lib/const/api';
import { events } from '@/lib/const/events';
import { isFormValid, validateAllFields } from '@/lib/helpers/formValidator';
import { playAudio } from '@/lib/helpers/playAudio';
import { cn } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';
import { LoaderCircle } from 'lucide-preact';
import type { TargetedEvent } from 'preact';
import { useReducer } from 'preact/hooks';
import { toast } from 'sonner';
import GhostInput from '../form/GhostInput';
import GhostLabel from '../form/GhostLabel';
import GhostTextArea from '../form/GhostTextArea';
import InputError from '../form/InputError';
import { Button } from '../ui/Button';

export interface WebformState {
    name: string;
    email: string;
    telegram: string;
    whatsapp: string;
    message: string;
}

type Action =
    | { type: 'SET_NAME'; payload: string }
    | { type: 'SET_EMAIL'; payload: string }
    | { type: 'SET_TELEGRAM'; payload: string }
    | { type: 'SET_WHATSAPP'; payload: string }
    | { type: 'SET_MESSAGE'; payload: string };

const initialState: WebformState = {
    name: '',
    email: '',
    telegram: '',
    whatsapp: '',
    message: '',
};

function reducer(state: WebformState, action: Action): WebformState {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'SET_TELEGRAM':
            return { ...state, telegram: action.payload };
        case 'SET_WHATSAPP':
            return { ...state, whatsapp: action.payload };
        case 'SET_MESSAGE':
            return { ...state, message: action.payload };
        default:
            throw new Error('Unexpected action type');
    }
}

const Webform: FC<{ className?: string }> = ({ className }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const lang = locale.value === 'ru' ? 'ru' : 'en';
    const { fetchData, loading, errors, setErrors, clearErrors } = useFetch();

    async function submit(e: TargetedEvent<HTMLFormElement, Event>) {
        e.preventDefault();

        if (!isFormValid(state, lang)) {
            const fieldErrors = validateAllFields(state, lang);
            setErrors({ errors: fieldErrors, message: 'Invalid form' });
            return;
        }

        clearErrors();

        await fetchData({
            url: `${API_BASE_URL}email`,
            method: 'POST',
            payload: state,
            onSuccess: () => {
                toast.success(
                    lang === 'ru'
                        ? 'Ваше письмо было успешно отправлено! Постараюсь вам ответить в ближайшее время. Хорошего вам дня и настроения :)'
                        : 'Your message was successfully sent! I will try to get back to you as soon as possible. Have a wonderful day :)',
                );

                window.dispatchEvent(
                    new CustomEvent(events.CHANGE_FORM_STATUS, {
                        detail: 'confirm',
                    }),
                );
            },
            onError: (err: ServerError) => {
                console.error(err);
                setErrors(err);

                toast.error(
                    lang === 'ru'
                        ? 'Не удалось отправить форму'
                        : 'Error sending the webform',
                );
            },
        });
    }

    return (
        <form class={cn('w-full max-w-220', className)} onSubmit={submit}>
            <div class="grid items-start gap-11 lg:grid-cols-2">
                <div class="group grid gap-2">
                    <GhostLabel htmlFor="name">Full Name</GhostLabel>
                    <GhostInput
                        id="name"
                        autoComplete="name"
                        value={state.name}
                        onInput={(e) =>
                            dispatch({
                                type: 'SET_NAME',
                                payload: (e.target as HTMLInputElement).value,
                            })
                        }
                        placeholder="John Doe"
                    />
                    <InputError message={errors?.errors?.name ?? ''} />
                </div>

                <div class="group grid gap-2">
                    <GhostLabel htmlFor="email">Email</GhostLabel>
                    <GhostInput
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={state.email}
                        onInput={(e) =>
                            dispatch({
                                type: 'SET_EMAIL',
                                payload: (e.target as HTMLInputElement).value,
                            })
                        }
                        placeholder="example@gmail.com"
                    />
                    <InputError message={errors?.errors?.email ?? ''} />
                </div>

                <div class="group grid gap-2">
                    <GhostLabel htmlFor="telegram">Telegram</GhostLabel>
                    <GhostInput
                        id="telegram"
                        autoComplete="telegram"
                        value={state.telegram}
                        onInput={(e) =>
                            dispatch({
                                type: 'SET_TELEGRAM',
                                payload: (e.target as HTMLInputElement).value,
                            })
                        }
                        placeholder="@InterestedUser1456"
                    />
                    <InputError message={errors?.errors?.telegram ?? ''} />
                </div>

                <div class="group grid gap-2">
                    <GhostLabel htmlFor="whatsapp">Whatsapp</GhostLabel>
                    <GhostInput
                        id="whatsapp"
                        autoComplete="whatsapp"
                        value={state.whatsapp}
                        onInput={(e) =>
                            dispatch({
                                type: 'SET_WHATSAPP',
                                payload: (e.target as HTMLInputElement).value,
                            })
                        }
                        placeholder="+1 223 223 22 33"
                    />
                    <InputError message={errors?.errors?.whatsapp ?? ''} />
                </div>
            </div>

            <div class="group mt-11 grid gap-2">
                <GhostLabel htmlFor="message">Message</GhostLabel>
                <GhostTextArea
                    id="message"
                    autoComplete="message"
                    value={state.message}
                    onInput={(e) =>
                        dispatch({
                            type: 'SET_MESSAGE',
                            payload: (e.target as HTMLInputElement).value,
                        })
                    }
                    placeholder="Help me build a cool and interesting website that will make me happy every day!"
                />
                <InputError message={errors?.errors?.message ?? ''} />
            </div>

            <Button
                type="submit"
                class="mx-auto mt-12 lg:mr-0"
                variant="primary"
                onClick={() => playAudio('click')}
                disabled={loading}
            >
                {loading && <LoaderCircle class="h-4 w-4 animate-spin" />}
                Submit
            </Button>
        </form>
    );
};

export default Webform;
