import { isServerError, type ServerError } from '@/hooks/useForm';
import { hasErrorDetails } from '@/lib/helpers/utils';
import type { ComponentChildren } from 'preact';
import { type FC } from 'preact/compat';

const StateResolver: FC<{
    errors: ServerError | null;
    loading: boolean;
    children: ComponentChildren;
}> = ({ errors, loading, children }) => {
    if (loading) {
        return 'Loading...';
    }

    if (isServerError(errors) && hasErrorDetails(errors)) {
        console.error(errors);
        return <p>{errors.message}</p>;
    }

    return children;
};

export default StateResolver;
