import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
  integrations: [icon()],
  trailingSlash: 'always',
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
