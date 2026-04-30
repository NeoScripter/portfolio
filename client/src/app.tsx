import { effect } from '@preact/signals';
import {
    ErrorBoundary,
    hydrate,
    LocationProvider,
    Route,
    Router,
    prerender as ssr,
} from 'preact-iso';
import './assets/css/app.css';
import { routes } from './routes';
import { theme } from './signals/theme';
import WithAuth from './components/auth/WithAuth';

export function App() {
    if (typeof window !== 'undefined') {
        effect(() => {
            document.documentElement.classList.toggle(
                'dark',
                theme.value === 'dark' ||
                    (theme.value === 'system' &&
                        window.matchMedia('(prefers-color-scheme: dark)')
                            .matches),
            );
        });
    }

    return (
        <LocationProvider>
            <ErrorBoundary>
                <Router>
                    {routes.map((route) => (
                        <Route
                            path={route.path}
                            component={
                                route.protected
                                    ? WithAuth(route.component)
                                    : route.component
                            }
                        />
                    ))}
                </Router>
            </ErrorBoundary>
        </LocationProvider>
    );
}
if (typeof window !== 'undefined') {
    hydrate(<App />, document.getElementById('app')!);
}

export async function prerender(data) {
    return await ssr(<App />);
}
