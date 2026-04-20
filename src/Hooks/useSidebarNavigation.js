import { useMemo } from 'react';
import topics from '../content/topics.json';

/**
 * Custom hook to group topics for sidebar navigation.
 * Groups topics by category and then by subcategory.
 *
 * @returns {Array} Array of category objects with subcategories and ungrouped topics.
 */
export const useSidebarNavigation = () => {
  const formatTitle = (slug) => {
    if (!slug) return '';
    return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const navigation = useMemo(() => {
    const grouped = topics.reduce((acc, topic) => {
      const { category, subcategory } = topic;

      if (!acc[category]) {
        acc[category] = {
          id: category,
          name: formatTitle(category),
          subcategories: {},
          ungrouped: [],
        };
      }

      if (subcategory && subcategory.trim() !== '') {
        if (!acc[category].subcategories[subcategory]) {
          acc[category].subcategories[subcategory] = {
            id: subcategory,
            name: formatTitle(subcategory),
            topics: [],
          };
        }
        acc[category].subcategories[subcategory].topics.push(topic);
      } else {
        acc[category].ungrouped.push(topic);
      }

      return acc;
    }, {});

    // Convert to array and ensure subcategories are also arrays
    return Object.values(grouped).map((cat) => ({
      ...cat,
      subcategories: Object.values(cat.subcategories),
    }));
  }, []);

  return navigation;
};

export default useSidebarNavigation;
