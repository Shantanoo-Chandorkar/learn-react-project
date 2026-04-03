import React, { useReducer, useMemo, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const initialState = {
  cart: [],
  discount: 0,
  shippingFee: 0,
};

// Pure helper function for total calculations
const calculateTotals = (cart) => {
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const discount = itemCount > 3 ? 0.1 : 0;
  const shippingFee = itemCount > 0 ? 10 : 0;

  return {
    cart,
    discount,
    shippingFee,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      let updatedCart;

      if (existingItemIndex !== -1) {
        updatedCart = state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }

      return calculateTotals(updatedCart);
    }

    case 'REMOVE_ITEM': {
      const filteredCart = state.cart
        .map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0);

      return calculateTotals(filteredCart);
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

/**
 * Custom hook to manage shopping cart state.
 */
const useShoppingCart = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = useCallback((product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  }, []);

  const removeItem = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const subtotal = useMemo(
    () => state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [state.cart],
  );

  const total = useMemo(
    () => subtotal - subtotal * state.discount + state.shippingFee,
    [subtotal, state.discount, state.shippingFee],
  );

  return {
    ...state,
    subtotal,
    total,
    addItem,
    removeItem,
    clearCart,
  };
};

/**
 * Pure presentational component for the shopping cart view.
 */
const CartView = memo(
  ({ cart, discount, shippingFee, subtotal, total, addItem, removeItem, clearCart }) => {
    const fakeProducts = [
      { id: 1, name: 'Phone', price: 500 },
      { id: 2, name: 'Shoes', price: 150 },
      { id: 3, name: 'Book', price: 30 },
      { id: 4, name: 'Headphones', price: 200 },
      { id: 5, name: 'Watch', price: 300 },
    ];

    return (
      <div className="cart-outer-container">
        <h2 className="cart-header">🛒 Shopping Cart with Quantity, Discount & Shipping</h2>

        <div className="cart-products">
          {fakeProducts.map((product) => (
            <div key={product.id} className="cart-product">
              <p>
                {product.name} - ${product.price}
              </p>
              <button onClick={() => addItem(product)}>Add to Cart</button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>🧾 Cart Summary</h3>
          {cart.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            <>
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.name} - ${item.price} x {item.quantity}{' '}
                    <button onClick={() => removeItem(item.id)}>➖ Remove One</button>
                  </li>
                ))}
              </ul>
              <p>
                <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
              </p>
              {discount > 0 && (
                <p>
                  <strong>Discount (10%):</strong> -${(subtotal * discount).toFixed(2)}
                </p>
              )}
              {shippingFee > 0 && (
                <p>
                  <strong>Shipping Fee:</strong> +${shippingFee}
                </p>
              )}
              <h4>
                <strong>Total:</strong> ${total.toFixed(2)}
              </h4>
              <button onClick={() => clearCart()}>🧹 Clear Cart</button>
            </>
          )}
        </div>
      </div>
    );
  },
);

CartView.displayName = 'CartView';
CartView.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  discount: PropTypes.number.isRequired,
  shippingFee: PropTypes.number.isRequired,
  subtotal: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  addItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
};

/**
 * Container component that connects the custom hook to the view.
 */
const UseReducerComponentExample = () => {
  const cartProps = useShoppingCart();
  return <CartView {...cartProps} />;
};

export default UseReducerComponentExample;
