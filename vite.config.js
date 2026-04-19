import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
      providerImportSource: '@mdx-js/react',
    }),
    react(),
  ],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
});
