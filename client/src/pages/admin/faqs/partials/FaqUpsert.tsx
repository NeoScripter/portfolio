import AdminBtn from '@/components/form/AdminBtn';
import AdminInput from '@/components/form/AdminInput';
import AdminTextArea from '@/components/form/AdminTextArea';
import { useFetch } from '@/hooks/useFetch';
import FormLayout from '@/layouts/FormLayout';
import type { FaqType } from '@/lib/types/models/faqs';
import { createSessionSignal } from '@/signals/session-store';
import { useLocation } from 'preact-iso';
import type { FC } from 'preact/compat';
import { useMemo, useReducer } from 'preact/hooks';
import { toast } from 'sonner';

type FaqUpsertState = {
    title_en: string;
    title_ru: string;
    content_en: string;
    content_ru: string;
};

const faqSignal = createSessionSignal('faq', {});

type Action =
    | { type: 'SET_TITLE_EN'; payload: string }
    | { type: 'SET_TITLE_RU'; payload: string }
    | { type: 'SET_CONTENT_EN'; payload: string }
    | { type: 'SET_CONTENT_RU'; payload: string }
    | { type: 'RESTORE_FROM_BACKUP'; payload: FaqUpsertState };

function reducer(state: FaqUpsertState, action: Action): FaqUpsertState {
    let newState: FaqUpsertState;

    switch (action.type) {
        case 'SET_TITLE_EN':
            newState = { ...state, title_en: action.payload };
            break;
        case 'SET_TITLE_RU':
            newState = { ...state, title_ru: action.payload };
            break;
        case 'SET_CONTENT_EN':
            newState = { ...state, content_en: action.payload };
            break;
        case 'SET_CONTENT_RU':
            newState = { ...state, content_ru: action.payload };
            break;
        case 'RESTORE_FROM_BACKUP':
            return action.payload;
        default:
            throw new Error('Unexpected action type');
    }

    faqSignal.value = newState;
    return newState;
}

const FaqUpsert: FC<{ faq?: FaqType }> = ({ faq }) => {
    const { route } = useLocation();
    const initialState = useMemo(
        () => ({
            title_en: faq?.attr.title?.en ?? '',
            title_ru: faq?.attr.title?.ru ?? '',
            content_en: faq?.attr.description?.en ?? '',
            content_ru: faq?.attr.description?.ru ?? '',
        }),
        [faq],
    );
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleBackupClick = () => {
        dispatch({
            type: 'RESTORE_FROM_BACKUP',
            payload: faqSignal.value as FaqUpsertState,
        });
    };
    const { fetchData, loading, errors } = useFetch();

    const routeName = faq != null ? `/admin/faqs/${faq.id}` : '/admin/faqs';
    const method = faq != null ? 'PUT' : 'POST';

    async function submit() {
        await fetchData({
            url: routeName,
            method: method,
            payload: state,
            onSuccess: () => {
                route('/faqs');
                toast.success('Success!');
            },
            onError: () => toast.error('Error'),
        });
    }

    return (
        <FormLayout handleBackupClick={handleBackupClick} onSubmit={submit}>
            <AdminInput
                key="title_en"
                label="Question (EN)"
                value={state.title_en}
                onInput={(value) =>
                    dispatch({ type: 'SET_TITLE_EN', payload: value })
                }
                error={errors?.errors?.title_en?.[0]}
            />
            <AdminInput
                key="title_ru"
                label="Question (RU)"
                value={state.title_ru}
                onInput={(value) =>
                    dispatch({ type: 'SET_TITLE_RU', payload: value })
                }
                error={errors?.errors?.title_ru?.[0]}
            />
            <AdminTextArea
                key="content_en"
                label="Answer (EN)"
                value={state.content_en}
                onInput={(value) =>
                    dispatch({ type: 'SET_CONTENT_EN', payload: value })
                }
                error={errors?.errors?.content_en?.[0]}
            />
            <AdminTextArea
                key="content_ru"
                label="Answer (RU)"
                value={state.content_ru}
                onInput={(value) =>
                    dispatch({ type: 'SET_CONTENT_RU', payload: value })
                }
                error={errors?.errors?.content_ru?.[0]}
            />
            <AdminBtn cancelLink="/faqs" loading={loading} />
        </FormLayout>
    );
};

export default FaqUpsert;
