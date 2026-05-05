import { defineCollection, z } from 'astro:content';

/**
 * Content Collection schema for all topic MDX files.
 *
 * Frontmatter fields are validated at build time. Any MDX file in
 * src/content/topics/ that violates this schema will cause a build error,
 * which is the primary safety net the plan described.
 */
const topics = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        category: z.string(),
        subcategory: z.string().optional(),
        /** Numeric order for sorting within a category — matches the id from the legacy topics.json. */
        order: z.number().optional(),
        description: z.string().optional(),
    }),
});

export const collections = { topics };
