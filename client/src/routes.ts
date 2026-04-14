import { lazy } from 'preact-iso';
import NotFound from './pages/404/NotFound';

const About = lazy(() => import('./pages/about/About'));
const Home = lazy(() => import('./pages/home/Home'));
const Gallery = lazy(() => import('./pages/gallery/Gallery'));
const Project = lazy(() => import('./pages/project/Project'));
const Login = lazy(() => import('./pages/login/Login'));

const Dashboard = lazy(() => import('./pages/admin/dashboard/Dashboard'));
const Profile = lazy(() => import('./pages/admin/profile/Profile'));
const Password = lazy(() => import('./pages/admin/password/Password'));
const Appearance = lazy(() => import('./pages/admin/appearance/Appearance'));

const FaqIndex = lazy(() => import('./pages/admin/faqs/Index'));
const FaqEdit = lazy(() => import('./pages/admin/faqs/Edit'));
const FaqCreate = lazy(() => import('./pages/admin/faqs/Create'));

const ReviewIndex = lazy(() => import('./pages/admin/reviews/Index'));
const ReviewEdit = lazy(() => import('./pages/admin/reviews/Edit'));
const ReviewCreate = lazy(() => import('./pages/admin/reviews/Create'));

const VideoIndex = lazy(() => import('./pages/admin/videos/Index'));
const VideoEdit = lazy(() => import('./pages/admin/videos/Edit'));
const VideoCreate = lazy(() => import('./pages/admin/videos/Create'));

const TechStackIndex = lazy(() => import('./pages/admin/tech-stack/Index'));
const TechStackEdit = lazy(() => import('./pages/admin/tech-stack/Edit'));
const TechStackCreate = lazy(() => import('./pages/admin/tech-stack/Create'));

export const routes = [
    { component: Home, path: '/' },
    { component: About, path: '/about' },
    { component: Login, path: '/login' },
    { component: Gallery, path: '/gallery' },
    { component: Project, path: '/gallery/:slug' },

    // Admin Panel
    { component: Dashboard, path: '/admin' },
    { component: Profile, path: '/admin/settings/profile' },
    { component: Password, path: '/admin/settings/password' },
    { component: Appearance, path: '/admin/settings/appearance' },

    { component: FaqIndex, path: '/admin/faqs' },
    { component: FaqCreate, path: '/admin/faqs/create' },
    { component: FaqEdit, path: '/admin/faqs/:id' },

    { component: ReviewIndex, path: '/admin/reviews' },
    { component: ReviewCreate, path: '/admin/reviews/create' },
    { component: ReviewEdit, path: '/admin/reviews/:id' },

    { component: VideoIndex, path: '/admin/videos' },
    { component: VideoCreate, path: '/admin/videos/create' },
    { component: VideoEdit, path: '/admin/videos/:id' },

    { component: TechStackIndex, path: '/admin/stacks' },
    { component: TechStackCreate, path: '/admin/stacks/create' },
    { component: TechStackEdit, path: '/admin/stacks/:id' },

    { component: NotFound, path: '*' },
];
