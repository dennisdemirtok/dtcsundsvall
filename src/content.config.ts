import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const artiklar = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artiklar' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    /** Mono-etikett på kortet, t.ex. "TAK 27°" */
    dim: z.string(),
    /** Slugs till relaterade tjänster */
    services: z.array(z.string()).default([]),
  }),
});

export const collections = { artiklar };
