import { getCollection } from 'astro:content';
import { formatTitle } from './formatTitle';
import categoryMeta from '../data/categoryMeta';

/**
 * Builds one summary per content category from the topics collection.
 * Ordering reflects each category's earliest `order` value, so it stays
 * correct as categories are added without hardcoding category names.
 *
 * @returns {Promise<Array<{slug: string, name: string, description: string, count: number}>>}
 */
export async function getCategorySummaries() {
  const topics = await getCollection('topics');

  const byCategory = new Map();
  for (const topic of topics) {
    if (topic.data.isUnlisted) continue;
    const slug = topic.data.category;
    const order = topic.data.order ?? Infinity;
    if (!byCategory.has(slug)) {
      byCategory.set(slug, { count: 0, minOrder: order });
    }
    const entry = byCategory.get(slug);
    entry.count += 1;
    entry.minOrder = Math.min(entry.minOrder, order);
  }

  return Array.from(byCategory.entries())
    .map(([slug, { count, minOrder }]) => ({
      slug,
      name: categoryMeta[slug]?.name ?? formatTitle(slug),
      description: categoryMeta[slug]?.description ?? '',
      count,
      minOrder,
    }))
    .sort((a, b) => a.minOrder - b.minOrder);
}

export default getCategorySummaries;
