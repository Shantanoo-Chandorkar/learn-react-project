import { useReducer } from "react";
import "./style.css";

const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Headphones", price: 200 },
  { id: 3, name: "Keyboard", price: 150 },
  { id: 4, name: "Smartphone", price: 999 },
];

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.find(item => item.id === action.product.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.product, quantity: 1 }];
      }
    case "REMOVE_ITEM":
      return state.filter(item => item.id !== action.id);
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

const UseReducerComponentExample = () => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const handleAddToCart = (product) => {
    dispatch({ type: "ADD_ITEM", product });
  };

  const handleRemoveFromCart = (id) => {
    dispatch({ type: "REMOVE_ITEM", id });
  };

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="use-reducer-cart-outer-container">
      <h2 className="use-reducer-header">🛒 Shopping Cart</h2>

      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h4>{product.name}</h4>
            <p>${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h3>Your Cart</h3>
        {cart.length === 0 ? (
          <p>Cart is empty 🛒</p>
        ) : (
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name} (x{item.quantity}) - ${item.price * item.quantity}
                <button onClick={() => handleRemoveFromCart(item.id)}>❌</button>
              </li>
            ))}
          </ul>
        )}
        <div className="cart-summary">
          <strong>Total: ${total}</strong>
        </div>
        <button onClick={handleClearCart} className="clear-cart-button">
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default UseReducerComponentExample;
