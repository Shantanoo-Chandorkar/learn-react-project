/**
 * Converts a hyphenated slug into Title Case for display.
 *
 * @param {string} slug - Hyphenated slug, e.g. "javascript-es6".
 * @returns {string} Title-cased label, e.g. "Javascript Es6".
 */
export const formatTitle = (slug) => {
  if (!slug) return '';
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default formatTitle;
