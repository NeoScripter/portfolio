import './assets/css/app.css';
import {
    ErrorBoundary,
    hydrate,
    LocationProvider,
    Route,
    Router,
} from 'preact-iso';
import { routes } from './routes';

function App() {
    return (
        <LocationProvider>
            <ErrorBoundary>
                <Router>
                    {routes.map((route) => (
                        <Route
                            path={route.path}
                            component={route.component}
                        />
                    ))}
                </Router>
            </ErrorBoundary>
        </LocationProvider>
    );
}

hydrate(<App />, document.getElementById('app')!);
