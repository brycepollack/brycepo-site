import { z, defineCollection } from 'astro:content';

const pagesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.string(),
    draft: z.boolean(),
  }),
});

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.string(),
    draft: z.boolean(),
  }),
});

export const collections = {
  pages: pagesCollection,
  blog: blogCollection,
};
