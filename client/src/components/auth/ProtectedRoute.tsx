import { useFetch } from '@/hooks/useFetch';
import { API_BASE_URL } from '@/lib/const/api';
import { currentUser } from '@/signals/auth';
import type { ComponentType } from 'preact';
import { useLocation } from 'preact-iso';
import { useEffect } from 'preact/hooks';

function ProtectedRoute({ children }: { children: preact.ComponentChildren }) {
    const { route } = useLocation();
    const { fetchData, loading } = useFetch();

    useEffect(() => {
        if (currentUser.value != null) {
            return;
        }
        fetchData({
            url: `${API_BASE_URL}verify`,
            method: 'POST',
            onSuccess: (data) => {
                currentUser.value = data?.user;
            },
            onError: () => {
                currentUser.value = null;
                route('/login');
            },
        });
    }, []);

    if (loading) return null;

    return children;
}

const withAuth = <P extends object>(Component: ComponentType<P>) => {
    return (props: P) => (
        <ProtectedRoute>
            <Component {...props} />
        </ProtectedRoute>
    );
};

export default withAuth;
