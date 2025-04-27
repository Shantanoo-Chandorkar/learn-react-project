const useReducerInformation = [
  `The <strong>useReducer</strong> Hook in React is used to manage more complex component state logic.
   It's an alternative to <code>useState</code> and is especially useful when:
   <ul>
     <li>State depends on previous state.</li>
     <li>State transitions are complex or involve multiple sub-values.</li>
     <li>You want a more predictable, centralized way to handle actions.</li>
   </ul>`,

  `<strong>Syntax:</strong> <code>const [state, dispatch] = useReducer(reducerFunction, initialState);</code>`,

  `<strong>Key Concepts:</strong>
   <ul>
     <li><code>state</code>: Current state object.</li>
     <li><code>dispatch</code>: Function to send an action that describes what you want to do.</li>
     <li><code>reducer</code>: Pure function that receives <code>(state, action)</code> and returns a new state based on action type and payload.</li>
   </ul>`,

  `<strong>Best Practice (naming):</strong> 
   Name your reducer actions clearly using uppercase strings like <code>"ADD_ITEM"</code>, <code>"REMOVE_ITEM"</code>, <code>"CLEAR_CART"</code> to describe what happens.`,

  `<strong>Why was useReducer introduced?</strong>
   When applications grow, managing interconnected pieces of state with multiple <code>useState</code> calls can become messy and error-prone. 
   <code>useReducer</code> organizes state logic into a single place (the reducer function) — making the code more readable, scalable, and easier to debug.`,

  `<strong>Problem Solved:</strong>
   <ul>
     <li>Groups related state updates together logically.</li>
     <li>Makes it easy to handle complex updates (like adding/removing items, adjusting quantities, applying discounts, etc.).</li>
     <li>Predictable flow: Dispatch an action → Reducer updates the state.</li>
   </ul>`,

  `<strong>How have we used useReducer in our example?</strong>
   In our <strong>Shopping Cart</strong> app:
   <ul>
     <li>The <code>initialState</code> contains <strong>cart items</strong>, <strong>discount</strong>, and <strong>shipping fee</strong>.</li>
     <li>The <code>reducer</code> handles three action types:
       <ul>
         <li><strong>ADD_ITEM</strong>: Adds an item to the cart or increases quantity if it already exists.</li>
         <li><strong>REMOVE_ITEM</strong>: Decreases quantity or removes item if quantity hits zero.</li>
         <li><strong>CLEAR_CART</strong>: Resets the cart back to empty.</li>
       </ul>
     </li>
     <li>We have a helper function <code>calculateTotals</code> that recalculates discount and shipping fee after every update.</li>
   </ul>`,

  `<strong>Why is this better than useState here?</strong>
   <ul>
     <li>Adding/removing items and updating discount logic are tightly related — <code>useReducer</code> keeps them all inside a clean, organized <code>reducer</code>.</li>
     <li>State transitions are predictable: No risk of forgetting to update discount or shipping manually.</li>
     <li>Scaling up (like adding coupons, taxes, multiple shipping options later) would be easier — just new action types, no spaghetti code.</li>
   </ul>`,

  `<strong>Best Practices for using useReducer:</strong>
   <ul>
     <li><strong>Keep the reducer pure:</strong> No side effects (like async calls) inside reducer — just compute and return new state.</li>
     <li><strong>Use a helper function</strong> (like <code>calculateTotals</code>) if the state transformation is complex.</li>
     <li><strong>Use clear action types:</strong> Always describe actions in a consistent and human-readable way (uppercase with underscores).</li>
     <li><strong>Group related actions:</strong> If you have many actions, group them into an <code>ACTION_TYPES</code> object to avoid typos.</li>
   </ul>`,

  `<strong>Extra Tip:</strong> 
   If the reducer gets too big, you can split it into smaller reducers and combine them manually — similar to Redux reducers!`
];

export default useReducerInformation;
