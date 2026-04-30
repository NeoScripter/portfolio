import { effect } from '@preact/signals';
import { render } from 'preact';
import {
    ErrorBoundary,
    LocationProvider,
    Route,
    Router,
    prerender as ssr,
} from 'preact-iso';
import './assets/css/app.css';
import WithAuth from './components/auth/WithAuth';
import { routes } from './routes';
import { theme } from './signals/theme';

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
    render(<App />, document.getElementById('app')!);
}

export async function prerender(data) {
    return await ssr(<App />);
}
