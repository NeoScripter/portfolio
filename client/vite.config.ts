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
                    '/gallery/healthy-lifestyle-website-way-to-self-2',
                    '/project',
                    '/login',
                    '/admin',
                    '/admin/settings/profile',
                    '/admin/settings/password',
                    '/admin/settings/appearance',
                    '/admin/faqs',
                    '/admin/faqs/create',
                    '/admin/faqs/1',
                    '/admin/reviews',
                    '/admin/reviews/create',
                    '/admin/reviews/1',
                    '/admin/videos',
                    '/admin/videos/create',
                    '/admin/videos/1',
                    '/admin/stacks',
                    '/admin/stacks/create',
                    '/admin/stacks/1',
                    '/admin/projects',
                    '/admin/projects/create',
                    '/admin/projects/healthy-lifestyle-website-way-to-self-2',
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
