import { defineConfig } from 'astro/config';

export default defineConfig({
    build: {
        inlineStylesheets: "never",
    },
    server: {
        host: true,
    },
});