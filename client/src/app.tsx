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

export function App() {
    return (
        <LocationProvider>
            <ErrorBoundary>
                <Router>
                    {routes.map((route) => (
                        <Route path={route.path} component={route.component} />
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
