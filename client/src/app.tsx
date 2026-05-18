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
import WithAuth from './components/auth/WithAuth';
import { getIds, getSlugs } from './lib/helpers/ssrHelper';
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
    hydrate(<App />, document.getElementById('app')!);
}

const staticLinks = [
    '/admin',
    '/login',
    '/admin',
    '/admin/settings/profile',
    '/admin/settings/password',
    '/admin/settings/appearance',
];

export async function prerender(data) {
    const { html, links: discoveredLinks } = await ssr(<App {...data} />);

    const models = ['projects', 'faqs', 'reviews', 'videos', 'tech-stacks'];
    const dynamicLinks: string[] = [];

    for (const model of models) {
        const handler: (model: string) => Promise<string[]> =
            model === 'projects' ? getSlugs : getIds;

        const ids = await handler(model);

        ids.forEach((id) => {
            dynamicLinks.push(`/admin/${model}/${id}`);

            if (model === 'projects') {
                dynamicLinks.push(`/admin/projects/${id}`);
            }
        });

        staticLinks.push(`/admin/${model}`, `/admin/${model}/create`);
    }

    return {
        html,

        links: new Set([...discoveredLinks, ...dynamicLinks, ...staticLinks]),
    };
}
