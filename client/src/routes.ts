import { lazy } from 'preact-iso';

const About = lazy(() => import('./pages/about/About'));
const Home = lazy(() => import('./pages/home/Home'));

export const routes = [
    { component: Home, path: '/' },
    { component: About, path: '/about' },
];

