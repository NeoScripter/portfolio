import { useReducer } from 'preact/hooks';

export type ValidationErrors = Record<string, string[]>;

interface FetchOptions {
    url: string;
    method?: string;
    payload?: unknown;
    onSuccess?: (data: any) => void;
    onError?: () => void;
}

interface State {
    data: any;
    loading: boolean;
    resentlySuccessful: boolean;
    errors: ValidationErrors | null;
}

type Action =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: any }
    | { type: 'FETCH_ERROR'; payload: ValidationErrors | null }
    | { type: 'SET_ERRORS'; payload: ValidationErrors | null }
    | { type: 'RESET_SUCCESS' }
    | { type: 'RESET' };

const initialState: State = {
    data: null,
    loading: false,
    resentlySuccessful: false,
    errors: null,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true, errors: null };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                resentlySuccessful: true,
                data: action.payload,
            };
        case 'FETCH_ERROR':
            return { ...state, loading: false, errors: action.payload };
        case 'SET_ERRORS':
            return { ...state, errors: action.payload };
        case 'RESET_SUCCESS':
            return { ...state, resentlySuccessful: false };
        case 'RESET':
            return initialState;
        default:
            throw new Error('Unexpected action type');
    }
}

export function useFetch() {
    const [state, dispatch] = useReducer(reducer, initialState);

    async function fetchData({
        url,
        method = 'GET',
        payload,
        onSuccess,
        onError,
    }: FetchOptions) {
        dispatch({ type: 'FETCH_START' });

        try {
            const headers: Record<string, string> = {
                Accept: 'application/json',
            };
            if (!(payload instanceof FormData)) {
                headers['Content-Type'] = 'application/json';
            }

            const res = await fetch(url, {
                method,
                headers,
                body: payload
                    ? payload instanceof FormData
                        ? payload
                        : JSON.stringify(payload)
                    : undefined,
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                if (res.status === 422 && data.errors) {
                    dispatch({ type: 'FETCH_ERROR', payload: data.errors });
                } else {
                    throw new Error(data.message || res.statusText);
                }
                onError?.();
                return;
            }

            dispatch({ type: 'FETCH_SUCCESS', payload: data });
            onSuccess?.(data);
            setTimeout(() => dispatch({ type: 'RESET_SUCCESS' }), 2000);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'API fetching error';

            console.error(message);
            dispatch({ type: 'FETCH_ERROR', payload: { general: [message] } });
            onError?.();
        }
    }

    function setErrors(errors: ValidationErrors | null) {
        dispatch({ type: 'SET_ERRORS', payload: errors });
    }

    function clearErrors() {
        dispatch({ type: 'SET_ERRORS', payload: null });
    }

    return {
        ...state,
        fetchData,
        setErrors,
        clearErrors,
        reset: () => dispatch({ type: 'RESET' }),
    };
}
