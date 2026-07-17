import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

// Astro 5: statisk output är default; API-routen sätter `prerender = false`
// och körs via node-adaptern (motsvarar "hybrid" i Astro 4).
export default defineConfig({
  site: 'https://www.dtcsundsvall.se',
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [sitemap()],
});
