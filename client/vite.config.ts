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
                    'gallery',
                    'project',
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
                secure: false
            },
        },
    },
});
