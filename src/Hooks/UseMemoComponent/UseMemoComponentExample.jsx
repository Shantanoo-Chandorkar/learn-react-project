import React, { useState, useMemo, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const generateProducts = () => {
  const categories = ['Electronics', 'Books', 'Clothing', 'Furniture', 'Beauty'];
  // Reduce size for better dev experience if needed, but keeping 2M as per original
  return new Array(2000000).fill(null).map((_, index) => ({
    id: index,
    name: `Product ${index + 1}`,
    category: categories[index % categories.length],
    price: Math.floor(Math.random() * 1000) + 50,
  }));
};

const allProducts = generateProducts();

const heavyFilterAndSort = (products, query) => {
  console.log('🔄 Filtering and Sorting products...');
  let result = products;
  if (query) {
    const lowerQuery = query.toLowerCase();
    result = products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) || p.category.toLowerCase().includes(lowerQuery),
    );
  }
  return [...result].sort((a, b) => b.price - a.price);
};

/**
 * Custom hook for product catalog logic
 */
const useProductCatalog = () => {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [cart, setCart] = useState(0);
  const [useMemoEnabled, setUseMemoEnabled] = useState(true);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchText]);

  const incrementCart = useCallback(() => setCart((c) => c + 1), []);
  const toggleMemo = useCallback(() => setUseMemoEnabled((v) => !v), []);

  const visibleProducts = useMemo(
    () => {
      return heavyFilterAndSort(allProducts, debouncedSearch);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedSearch, useMemoEnabled ? undefined : cart],
  );

  return {
    searchText,
    setSearchText,
    cart,
    incrementCart,
    useMemoEnabled,
    toggleMemo,
    visibleProducts,
  };
};

/**
 * Pure presentational component for Product Catalog UI
 */
const ProductCatalogUI = memo(
  ({
    searchText,
    onSearchChange,
    cart,
    onIncrementCart,
    useMemoEnabled,
    onToggleMemo,
    visibleProducts,
  }) => (
    <div className="heavy-example-outer-container">
      <h2 className="heavy-example-header">🛍️ Product Catalog</h2>

      <div className="heavy-example-controls">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          className="heavy-example-input"
          aria-label="Search products"
        />

        <button onClick={onIncrementCart} className="heavy-example-cart-button">
          Add to Cart ({cart})
        </button>

        <button onClick={onToggleMemo} className="heavy-example-toggle-button">
          {useMemoEnabled ? 'Disable useMemo' : 'Enable useMemo'}
        </button>
      </div>

      <div className="heavy-example-mode-indicator">
        <strong>useMemo is {useMemoEnabled ? 'ENABLED' : 'DISABLED'}</strong>
      </div>

      <div className="heavy-example-results">
        <h4>Showing {visibleProducts.length} products:</h4>
        <ul>
          {visibleProducts.slice(0, 20).map((product) => (
            <li key={product.id}>
              {product.name} - {product.category} - ${product.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  ),
);

ProductCatalogUI.displayName = 'ProductCatalogUI';
ProductCatalogUI.propTypes = {
  searchText: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  cart: PropTypes.number.isRequired,
  onIncrementCart: PropTypes.func.isRequired,
  useMemoEnabled: PropTypes.bool.isRequired,
  onToggleMemo: PropTypes.func.isRequired,
  visibleProducts: PropTypes.array.isRequired,
};

/**
 * Container component for the UseMemo example
 */
const UseMemoComponentExample = () => {
  const props = useProductCatalog();

  return <ProductCatalogUI {...props} onSearchChange={props.setSearchText} />;
};

export default UseMemoComponentExample;
