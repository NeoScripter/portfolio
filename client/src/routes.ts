import { lazy } from 'preact-iso';
import NotFound from './pages/404/NotFound';

const About = lazy(() => import('./pages/about/About'));
const Home = lazy(() => import('./pages/home/Home'));
// const NotFound = lazy(() => import('./pages/404/NotFound'));
const Gallery = lazy(() => import('./pages/gallery/Gallery'));
// const Project = lazy(() => import('./pages/user/project/project'));

export const routes = [
    { component: Home, path: '/' },
    { component: About, path: '/about' },
    { component: Gallery, path: '/gallery' },
    { component: NotFound, path: '*' },
];

