import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        preact({
            prerender: {
                enabled: true,
                renderTarget: '#app',
                prerenderScript: import.meta.dirname + '/src/app.tsx', // absolute path
                additionalPrerenderRoutes: [
                    '/',
                    '/about',
                    '/gallery',
                    '/gallery/:slug',
                    '/project',
                    '/login',
                    '/admin',
                    '/admin/settings/profile',
                    '/admin/settings/password',
                    '/admin/settings/appearance',
                    '/admin/faqs',
                    '/admin/faqs/create',
                    '/admin/reviews',
                    '/admin/reviews/create',
                    '/admin/videos',
                    '/admin/videos/create',
                    '/admin/stacks',
                    '/admin/stacks/create',
                    '/admin/projects',
                    '/admin/projects/create',
                ],
            },
        }),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': import.meta.dirname + '/src',
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'https://portfolio.test',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
