import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string().max(120).min(3),
      hero: image(),
      heroAlt: z.string(),
      description: z.string().max(160),
      pubDate: z.date(),
      updatedDate: z.date().optional(),
    }),
});

export const collections = {
  blog: blogCollection,
};
