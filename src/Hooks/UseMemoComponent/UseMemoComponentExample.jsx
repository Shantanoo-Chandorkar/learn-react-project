import { useState, useMemo, useEffect } from "react";
import "./style.css";

const generateProducts = () => {
  const categories = ["Electronics", "Books", "Clothing", "Furniture", "Beauty"];
  return new Array(2000000).fill(null).map((_, index) => ({
    id: index,
    name: `Product ${index + 1}`,
    category: categories[index % categories.length],
    price: Math.floor(Math.random() * 1000) + 50,
  }));
};

const allProducts = generateProducts();

const heavyFilterAndSort = (products, query) => {
  console.log("🔄 Filtering and Sorting products...");
  let result = products;
  if (query) {
    result = products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
  }
  return result.sort((a, b) => b.price - a.price);
};

const UseMemoComponentExample = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(""); // 👈 Debounced search
  const [cart, setCart] = useState(0);
  const [useMemoEnabled, setUseMemoEnabled] = useState(true);

  // 👇 Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchText]);

  const visibleProducts = useMemo(() => {
    return heavyFilterAndSort(allProducts, debouncedSearch);
  }, useMemoEnabled ? [debouncedSearch] : [debouncedSearch, cart]);

  return (
    <div className="heavy-example-outer-container">
      <h2 className="heavy-example-header">🛍️ Product Catalog</h2>

      <div className="heavy-example-controls">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="heavy-example-input"
        />

        <button
          onClick={() => setCart(cart + 1)}
          className="heavy-example-cart-button"
        >
          Add to Cart ({cart})
        </button>

        <button
          onClick={() => setUseMemoEnabled(prev => !prev)}
          className="heavy-example-toggle-button"
        >
          {useMemoEnabled ? "Disable useMemo" : "Enable useMemo"}
        </button>
      </div>

      <div className="heavy-example-mode-indicator">
        <strong>useMemo is {useMemoEnabled ? "ENABLED" : "DISABLED"}</strong>
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
  );
};

export default UseMemoComponentExample;
