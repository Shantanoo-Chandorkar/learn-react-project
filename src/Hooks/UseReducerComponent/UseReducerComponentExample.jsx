import { useReducer } from "react";
import "./style.css";

const initialState = {
  cart: [],
  discount: 0,
  shippingFee: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      let updatedCart;

      if (existingItemIndex !== -1) {
        // If item already exists, increase quantity
        updatedCart = state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new item, add it with quantity 1
        updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }

      return calculateTotals(updatedCart);

    case "REMOVE_ITEM":
      const filteredCart = state.cart
        .map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0); // remove completely if quantity drops to 0

      return calculateTotals(filteredCart);

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

// Helper function
const calculateTotals = (cart) => {
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const discount = itemCount > 3 ? 0.10 : 0;
  const shippingFee = itemCount > 0 ? 10 : 0;

  return {
    cart,
    discount,
    shippingFee,
  };
};

const UseReducerComponentExample = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const totalPrice = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discountedPrice = totalPrice - (totalPrice * state.discount) + state.shippingFee;

  const fakeProducts = [
    { id: 1, name: "Phone", price: 500 },
    { id: 2, name: "Shoes", price: 150 },
    { id: 3, name: "Book", price: 30 },
    { id: 4, name: "Headphones", price: 200 },
    { id: 5, name: "Watch", price: 300 },
  ];

  return (
    <div className="cart-outer-container">
      <h2 className="cart-header">🛒 Shopping Cart with Quantity, Discount & Shipping</h2>

      <div className="cart-products">
        {fakeProducts.map((product) => (
          <div key={product.id} className="cart-product">
            <p>{product.name} - ${product.price}</p>
            <button onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>🧾 Cart Summary</h3>
        {state.cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <>
            <ul>
              {state.cart.map(item => (
                <li key={item.id}>
                  {item.name} - ${item.price} x {item.quantity} {" "}
                  <button onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}>
                    ➖ Remove One
                  </button>
                </li>
              ))}
            </ul>
            <p><strong>Subtotal:</strong> ${totalPrice.toFixed(2)}</p>
            {state.discount > 0 && <p><strong>Discount (10%):</strong> -${(totalPrice * state.discount).toFixed(2)}</p>}
            {state.shippingFee > 0 && <p><strong>Shipping Fee:</strong> +${state.shippingFee}</p>}
            <h4><strong>Total:</strong> ${discountedPrice.toFixed(2)}</h4>
            <button onClick={() => dispatch({ type: "CLEAR_CART" })}>
              🧹 Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UseReducerComponentExample;
