import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import cloudflare from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    // Используем адаптер для Cloudflare с дополнительными настройками
    adapter: cloudflare({
      routes: {
        include: ['/*'],
        exclude: ['<all>'],
      },
      platformProxy: {
        // configPath: 'wrangler.toml', // путь к конфигу wrangler.toml
        environment: undefined, // можно указать окружение
        experimentalJsonConfig: false,
        persist: false,
      }
    }),
  },
};

export default config;
