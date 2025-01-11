import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import cloudflare from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    // Используем адаптер для Cloudflare
    adapter: cloudflare(),
  }
};

export default config;
