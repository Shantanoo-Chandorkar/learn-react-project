const EDGE_OG_BASE_URL = import.meta.env.VITE_EDGE_OG_BASE_URL;

/**
 * Builds the Edge OG image URL for a given topic.
 *
 * Uses URLSearchParams so all param values are automatically encoded —
 * titles with ampersands, colons, or other special characters are safe.
 *
 * @param {Object} topic
 * @param {string} topic.title    - The topic display title
 * @param {string} topic.category - The topic category (used as the card tag)
 * @returns {string} The full Edge OG /api/og URL
 */
export function buildOgImageUrl(topic) {
    const params = new URLSearchParams({
        template: 'blog-card',
        title: topic.title,
        tag: topic.category,
        author: 'Shantanoo Chandorkar',
        readTime: '5 min read',
        siteUrl: 'welcome-react-tutorial.netlify.app',
    });
    return `${EDGE_OG_BASE_URL}/api/og?${params.toString()}`;
}
