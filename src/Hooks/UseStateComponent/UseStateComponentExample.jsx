import { useState } from "react";
import "./style.css"

const UseStateComponentExample = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="use-state-component-outer-container">
      <h6>Count : {count}</h6>

      <button className="use-state-component-increment-button" onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button className="use-state-component-decrement-button" onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  )
}

export default UseStateComponentExample;