import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

/**
 * Custom hook for counter logic
 * @param {number} initialValue
 * @returns {object} { count, increment, decrement, reset }
 */
const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount((prev) => prev + 1), []);
  const decrement = useCallback(() => setCount((prev) => prev - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset };
};

/**
 * Pure presentational component for the Counter UI
 */
const CounterUI = memo(({ count, onIncrement, onDecrement, onReset }) => (
  <div className="use-state-component-outer-container">
    <h6>Count : {count}</h6>

    <button
      className="use-state-component-increment-button"
      onClick={onIncrement}
      aria-label="Increment count"
    >
      Increment
    </button>
    <button
      className="use-state-component-decrement-button"
      onClick={onDecrement}
      aria-label="Decrement count"
    >
      Decrement
    </button>
    <button className="use-state-component-reset-button" onClick={onReset} aria-label="Reset count">
      Reset
    </button>
  </div>
));

CounterUI.displayName = 'CounterUI';
CounterUI.propTypes = {
  count: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

/**
 * Container component for the UseState example
 */
const UseStateComponentExample = () => {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <CounterUI count={count} onIncrement={increment} onDecrement={decrement} onReset={reset} />
  );
};

export default UseStateComponentExample;
