import { useFetch } from '@/hooks/useFetch';
import { API_BASE_URL } from '@/lib/const/api';
import { currentUser } from '@/signals/auth';
import type { ComponentType } from 'preact';
import { useLocation } from 'preact-iso';
import { useLayoutEffect, useState } from 'preact/hooks';
import PageLoader from '../ui/PageLoader';

function ProtectedRoute({ children }: { children: preact.ComponentChildren }) {
    const { route } = useLocation();
    const { fetchData, loading } = useFetch();
    const [ready, setReady] = useState(false);

    useLayoutEffect(() => {
        if (currentUser.value != null) {
            const valid_until = currentUser.value.expires_at;
            if (valid_until * 1000 <= Date.now()) {
                currentUser.value = null;
                route('/login');
                return;
            }
            setReady(true);
            return;
        }
        fetchData({
            url: `${API_BASE_URL}verify`,
            method: 'POST',
            onSuccess: (data) => {
                const user = data.user;
                user.expires_at = data.expires_at;
                currentUser.value = user;
                setReady(true);
            },
            onError: () => {
                currentUser.value = null;
                route('/login');
            },
        });
    }, []);

    if (loading || !ready) return <PageLoader />;

    return children;
}

const WithAuth = <P extends object>(Component: ComponentType<P>) => {
    return (props: P) => (
        <ProtectedRoute>
            <Component {...props} />
        </ProtectedRoute>
    );
};

export default WithAuth;
