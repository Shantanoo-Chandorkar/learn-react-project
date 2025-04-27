import { useState, useCallback } from "react";
import "./style.css"; // External CSS

const ChildButton = ({ label, onAction }) => {
  return (
    <button className="child-button" onClick={onAction}>
      {label}
    </button>
  );
};

const UseCallbackComponentExample = () => {
  const [cartCount, setCartCount] = useState(0);
  const [checkoutCount, setCheckoutCount] = useState(0);
  const [removeCount, setRemoveCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [useCallbackEnabled, setUseCallbackEnabled] = useState(false);

  // Always call hooks! Don't conditionally call them.

  const memoizedAddToCart = useCallback(() => {
    setCartCount((prev) => prev + 1);
    setMessages((prev) => [...prev, `🛒 Added to Cart (${prev.length + 1})`]);
  }, []);

  const memoizedCheckout = useCallback(() => {
    setCheckoutCount((prev) => prev + 1);
    setMessages((prev) => [...prev, `✅ Checkout Completed (${prev.length + 1})`]);
  }, []);

  const memoizedRemoveFromCart = useCallback(() => {
    setRemoveCount((prev) => prev + 1);
    setMessages((prev) => [...prev, `❌ Removed from Cart (${prev.length + 1})`]);
  }, []);

  const nonMemoizedAddToCart = () => {
    setCartCount((prev) => prev + 1);
    setMessages((prev) => [...prev, `🛒 Added to Cart (${prev.length + 1})`]);
  };

  const nonMemoizedCheckout = () => {
    setCheckoutCount((prev) => prev + 1);
    setMessages((prev) => [...prev, `✅ Checkout Completed (${prev.length + 1})`]);
  };

  const nonMemoizedRemoveFromCart = () => {
    setRemoveCount((prev) => prev + 1);
    setMessages((prev) => [...prev, `❌ Removed from Cart (${prev.length + 1})`]);
  };

  return (
    <div className="use-callback-outer-container">
      <h2 className="use-callback-header">useCallback Demo</h2>

      <div className="use-callback-controls">
        <button
          className="use-callback-toggle-button"
          onClick={() => setUseCallbackEnabled((prev) => !prev)}
        >
          {useCallbackEnabled ? "Disable useCallback" : "Enable useCallback"}
        </button>

        <p className="use-callback-status">
          <strong>useCallback is {useCallbackEnabled ? "ENABLED" : "DISABLED"}</strong>
        </p>
      </div>

      <div className="use-callback-buttons-group">
        <ChildButton
          label="Add to Cart"
          onAction={useCallbackEnabled ? memoizedAddToCart : nonMemoizedAddToCart}
        />
        <ChildButton
          label="Remove from Cart"
          onAction={useCallbackEnabled ? memoizedRemoveFromCart : nonMemoizedRemoveFromCart}
        />
        <ChildButton
          label="Checkout"
          onAction={useCallbackEnabled ? memoizedCheckout : nonMemoizedCheckout}
        />
      </div>

      <div className="use-callback-messages">
        <h4>Activity Log:</h4>
        <ul>
          {messages.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UseCallbackComponentExample;
