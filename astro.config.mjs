import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import netlify from '@astrojs/netlify';
import remarkGfm from 'remark-gfm';

export default defineConfig({
    output: 'static',
    adapter: netlify(),
    integrations: [
        mdx({
            remarkPlugins: [remarkGfm],
        }),
        react(),
    ],
    markdown: {
        shikiConfig: {
            // Theme that closely matches the current dark code block aesthetic
            theme: 'github-dark',
            wrap: true,
        },
    },
});
