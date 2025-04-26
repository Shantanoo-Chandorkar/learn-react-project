import { useState } from "react";

const StateComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="state-component-outer-container">
      <h1>This is useState Hook Example</h1>

      <h3>Count : {count}</h3>
      <button className="state-component-increment-button">
        Increment
      </button>
      <button className="state-component-decrement-button">
        Decrement
      </button>
    </div>
  )
}

export default StateComponent;