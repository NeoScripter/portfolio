import { lazy } from 'preact-iso';
import NotFound from './pages/404/NotFound';

const About = lazy(() => import('./pages/about/About'));
const Home = lazy(() => import('./pages/home/Home'));
const Gallery = lazy(() => import('./pages/gallery/Gallery'));
const Project = lazy(() => import('./pages/project/Project'));
const Login = lazy(() => import('./pages/login/Login'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));

export const routes = [
    { component: Home, path: '/' },
    { component: About, path: '/about' },
    { component: Login, path: '/login' },
    { component: Gallery, path: '/gallery' },
    { component: Project, path: '/gallery/:slug' },

    // Admin Panel
    { component: Dashboard, path: '/admin' },

    { component: NotFound, path: '*' },
];
