import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

/**
 * Pure presentational component for a child button.
 * Uses React.memo to prevent unnecessary re-renders when props haven't changed.
 */
const ChildButton = memo(({ label, onAction }) => {
  console.log(`Rendering ChildButton: ${label}`);
  return (
    <button className="child-button" onClick={onAction}>
      {label}
    </button>
  );
});

ChildButton.displayName = 'ChildButton';
ChildButton.propTypes = {
  label: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
};

/**
 * Custom hook to manage the useCallback demo state and memoized callbacks.
 */
const useCallbackDemo = () => {
  const [messages, setMessages] = useState([]);
  const [useCallbackEnabled, setUseCallbackEnabled] = useState(false);

  const addMessage = useCallback((msg) => {
    setMessages((prev) => [...prev, `${msg} (${prev.length + 1})`]);
  }, []);

  // Memoized callbacks
  const memoizedAddToCart = useCallback(() => {
    addMessage('🛒 Added to Cart');
  }, [addMessage]);

  const memoizedCheckout = useCallback(() => {
    addMessage('✅ Checkout Completed');
  }, [addMessage]);

  const memoizedRemoveFromCart = useCallback(() => {
    addMessage('❌ Removed from Cart');
  }, [addMessage]);

  // Non-memoized callbacks (re-created on every render)
  const nonMemoizedAddToCart = () => {
    addMessage('🛒 Added to Cart');
  };

  const nonMemoizedCheckout = () => {
    addMessage('✅ Checkout Completed');
  };

  const nonMemoizedRemoveFromCart = () => {
    addMessage('❌ Removed from Cart');
  };

  const toggleUseCallback = () => {
    setUseCallbackEnabled((prev) => !prev);
  };

  return {
    messages,
    useCallbackEnabled,
    toggleUseCallback,
    actions: {
      addToCart: useCallbackEnabled ? memoizedAddToCart : nonMemoizedAddToCart,
      checkout: useCallbackEnabled ? memoizedCheckout : nonMemoizedCheckout,
      removeFromCart: useCallbackEnabled ? memoizedRemoveFromCart : nonMemoizedRemoveFromCart,
    },
  };
};

/**
 * Pure presentational component for the useCallback demo view.
 */
const UseCallbackView = memo(({ messages, useCallbackEnabled, toggleUseCallback, actions }) => {
  return (
    <div className="use-callback-outer-container">
      <h2 className="use-callback-header">useCallback Demo</h2>

      <div className="use-callback-controls">
        <button className="use-callback-toggle-button" onClick={toggleUseCallback}>
          {useCallbackEnabled ? 'Disable useCallback' : 'Enable useCallback'}
        </button>

        <p className="use-callback-status">
          <strong>useCallback is {useCallbackEnabled ? 'ENABLED' : 'DISABLED'}</strong>
        </p>
        <small>(Check console to see re-renders of ChildButton when disabled)</small>
      </div>

      <div className="use-callback-buttons-group">
        <ChildButton label="Add to Cart" onAction={actions.addToCart} />
        <ChildButton label="Remove from Cart" onAction={actions.removeFromCart} />
        <ChildButton label="Checkout" onAction={actions.checkout} />
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
});

UseCallbackView.displayName = 'UseCallbackView';
UseCallbackView.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  useCallbackEnabled: PropTypes.bool.isRequired,
  toggleUseCallback: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    addToCart: PropTypes.func.isRequired,
    checkout: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
  }).isRequired,
};

/**
 * Container component that connects the custom hook to the view.
 */
const UseCallbackComponentExample = () => {
  const demoProps = useCallbackDemo();
  return <UseCallbackView {...demoProps} />;
};

export default UseCallbackComponentExample;
