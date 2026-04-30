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

const ProjectIndex = lazy(() => import('./pages/admin/projects/Index'));
const ProjectEdit = lazy(() => import('./pages/admin/projects/Edit'));
const ProjectCreate = lazy(() => import('./pages/admin/projects/Create'));


export const routes = [
    { component: Home, path: '/', protected: false },
    { component: About, path: '/about', protected: false },
    { component: Login, path: '/login', protected: false },
    { component: Gallery, path: '/gallery', protected: false },
    { component: Project, path: '/gallery/:slug', protected: false },

    // Admin Panel
    { component: Dashboard, path: '/admin', protected: true },
    { component: Profile, path: '/admin/settings/profile', protected: true },
    { component: Password, path: '/admin/settings/password', protected: true },
    { component: Appearance, path: '/admin/settings/appearance', protected: true },

    { component: FaqIndex, path: '/admin/faqs', protected: true },
    { component: FaqCreate, path: '/admin/faqs/create', protected: true },
    { component: FaqEdit, path: '/admin/faqs/:id', protected: true },

    { component: ReviewIndex, path: '/admin/reviews', protected: true },
    { component: ReviewCreate, path: '/admin/reviews/create' , protected: true},
    { component: ReviewEdit, path: '/admin/reviews/:id' , protected: true},

    { component: VideoIndex, path: '/admin/videos' , protected: true},
    { component: VideoCreate, path: '/admin/videos/create' , protected: true},
    { component: VideoEdit, path: '/admin/videos/:id' , protected: true},

    { component: TechStackIndex, path: '/admin/stacks', protected: true },
    { component: TechStackCreate, path: '/admin/stacks/create', protected: true },
    { component: TechStackEdit, path: '/admin/stacks/:id', protected: true },

    { component: ProjectIndex, path: '/admin/projects' , protected: true},
    { component: ProjectCreate, path: '/admin/projects/create' , protected: true},
    { component: ProjectEdit, path: '/admin/projects/:slug' , protected: true},

    { component: NotFound, path: '*' },
];
