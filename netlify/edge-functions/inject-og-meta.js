import topics from '../../src/content/topics.json' with { type: 'json' };

const EDGE_OG_BASE_URL = 'https://edge-og-xi.vercel.app';

/**
 * Escapes characters that are special inside an HTML attribute value.
 * Topic titles can contain ampersands (e.g. "DOM & Browser APIs") or quotes
 * which would break the meta tag if written verbatim into content="...".
 *
 * @param {string} str - Raw string to escape
 * @returns {string} HTML-attribute-safe string
 */
function escapeHtmlAttr(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

/**
 * Builds the Edge OG /api/og URL for a topic.
 * URLSearchParams handles URL encoding automatically.
 *
 * @param {{ title: string, category: string }} topic
 * @returns {string}
 */
function buildOgImageUrl(topic) {
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

/**
 * Netlify Edge Function — injects Open Graph meta tags into /topic/:slug pages.
 *
 * Runs at the edge for every /topic/* request before the response reaches the
 * requester. Fetches the normal SPA HTML from Netlify, then injects og:image
 * and related tags directly into <head> before returning it.
 *
 * Because the tags are in the raw HTML, all crawlers see them — LinkedIn,
 * Twitter, Discord, Slack, opengraph.xyz — regardless of whether they execute
 * JavaScript. Regular browser users are unaffected; React hydrates normally.
 */
export default async (request, context) => {
    const url = new URL(request.url);
    const slug = url.pathname.slice('/topic/'.length);

    const topic = topics.find((t) => t.slug === slug);
    if (!topic) {
        // Unknown slug — let Netlify handle it (404 or redirect)
        return context.next();
    }

    const response = await context.next();
    const html = await response.text();

    const ogImageUrl = buildOgImageUrl(topic);

    const ogTags = [
        `<meta property="og:type" content="article" />`,
        `<meta property="og:title" content="${escapeHtmlAttr(topic.title)}" />`,
        `<meta property="og:url" content="${escapeHtmlAttr(url.href)}" />`,
        `<meta property="og:image" content="${escapeHtmlAttr(ogImageUrl)}" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:image" content="${escapeHtmlAttr(ogImageUrl)}" />`,
    ].join('\n    ');

    const injected = html.replace('</head>', `    ${ogTags}\n  </head>`);

    return new Response(injected, {
        status: response.status,
        headers: {
            ...Object.fromEntries(response.headers),
            'content-type': 'text/html; charset=utf-8',
        },
    });
};

export const config = { path: '/topic/*' };
