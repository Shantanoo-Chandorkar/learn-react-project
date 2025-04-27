const useStateInformation = [
  `The <strong>useState</strong> Hook is a special function in React that lets you add and manage local state inside functional components.`,

  `<strong>Syntax:</strong> <code>const [state, setState] = useState(initialState);</code>`,

  `The <code>useState</code> function returns an array with exactly two elements:
   - The first element is the <strong>current state value</strong>.
   - The second element is a <strong>function to update that state</strong>.
   This is why we use array destructuring to capture them.`,

  `<strong>Best Practice (naming):</strong> The updater function is usually named with the prefix "set", followed by the capitalized state name. For example, for <code>count</code>, the updater would be <code>setCount</code>. This improves readability and immediately shows the connection between state and its updater.`,

  `<strong>Initial State:</strong> The value passed inside <code>useState(initialState)</code> is the initial value of the state. It can be any data type: a number, string, boolean, array, object, or even a function. If you don't provide an initial value, the state will be <code>undefined</code>.`,

  `<strong>Why was useState introduced?</strong> 
   In early versions of React, only class components could have internal state (using <code>this.state</code> and <code>this.setState()</code>).
   This created a lot of unnecessary complexity, especially for small components that only needed simple behaviors.
   <code>useState</code> (and Hooks in general) was introduced to allow developers to use stateful logic inside functional components without needing classes, making components smaller, cleaner, and easier to understand.`,

  `<strong>Problem Solved:</strong>
   Before Hooks, you had to write full class components even for tiny state needs. Managing state inside functional components was not possible.
   <code>useState</code> solves this by allowing any function component to have local, isolated state, reducing the amount of boilerplate code and cognitive overhead.`,

  `<strong>How have we used useState in our example?</strong> 
   We built a simple counter app where the current <code>count</code> is displayed on the screen. The user can:
   - Increment the count by clicking an "Increment" button
   - Decrement the count by clicking a "Decrement" button
   - Reset the count to zero using a "Reset" button
   Every time a button is clicked, we call the <code>setCount</code> updater function, and React automatically re-renders the component with the new count.`,

  `<strong>Why is this beneficial?</strong>
   Without <code>useState</code>, we would have needed to use a class component for this tiny behavior, leading to more complicated syntax like <code>constructor()</code>, <code>this.setState()</code>, and explicit method bindings. 
   <code>useState</code> makes it extremely quick and natural to handle dynamic data inside any component.`,

  `<strong>Best Practices for using useState:</strong>
   <ul>
     <li><strong>Separate Concerns:</strong> If a component needs to track multiple unrelated pieces of state, call <code>useState</code> multiple times (instead of combining everything into one object).</li>
     <li><strong>Functional Updates:</strong> If your new state depends on the previous state (for example, incrementing a counter), always use the functional form: <code>setCount(prevCount => prevCount + 1)</code>. This ensures your updates are always accurate, even when React batches multiple updates.</li>
     <li><strong>Lazy Initialization:</strong> If calculating the initial state is expensive, you can pass a function to <code>useState</code> so that it runs only once on mount: <code>useState(() => expensiveComputation())</code>.</li>
     <li><strong>Immutable Updates:</strong> When updating complex states like arrays or objects, never mutate the existing state directly. Instead, create a new array or object and update it immutably. This ensures React correctly detects changes and re-renders as needed.</li>
     <li><strong>Avoid Overuse:</strong> Don't try to put every value into <code>useState</code>. Only values that need to trigger a UI update should go into state. Derived values can often be computed directly inside the component.</li>
   </ul>`,

  `<strong>Extra Tip:</strong> <code>useState</code> does not automatically merge objects the way <code>this.setState</code> used to do in class components. If you're managing an object in state, you must manually merge parts of it when updating.`,
];

export default useStateInformation;
