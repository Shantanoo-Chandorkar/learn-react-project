const useCallbackInformation = [
  `The <strong>useCallback</strong> Hook in React is used to memoize (cache) a function.
   It returns a <strong>memoized version of the callback</strong> that only changes if its dependencies change.`,

  `<strong>Syntax:</strong> <code>const memoizedCallback = useCallback(() => { /* function */ }, [dependencies]);</code>`,

  `Without <code>useCallback</code>, every time a component renders, all its functions are re-created in memory.
   This can cause unnecessary re-renders for child components if functions are passed as props.`,

  `<strong>Best Practice (naming):</strong> 
   Use clear names like <code>memoizedAddToCart</code> or <code>memoizedHandleSubmit</code> to indicate which functions are memoized.`,

  `<strong>Why was useCallback introduced?</strong>
   In functional components, functions are redefined on every render, which can be inefficient, especially when:
   <ul>
     <li>Passing functions to optimized child components (e.g., wrapped in <code>React.memo</code>).</li>
     <li>Working with expensive computations inside event handlers.</li>
   </ul>
   <code>useCallback</code> avoids unnecessary re-creations of functions, improving performance.`,

  `<strong>Problem Solved:</strong>
   <ul>
     <li>Prevents re-creating the same function unnecessarily across renders.</li>
     <li>Helps child components avoid re-rendering when the function prop hasn't changed.</li>
     <li>Keeps function identity stable unless dependencies change.</li>
   </ul>`,

  `<strong>How have we used useCallback in our example?</strong>
   In our <strong>useCallback Demo</strong> app:
   <ul>
     <li>We have two versions of each action function: a memoized one and a non-memoized one.</li>
     <li><strong><code>memoizedAddToCart</code>, <code>memoizedCheckout</code>, <code>memoizedRemoveFromCart</code></strong> are created using <code>useCallback</code> with an empty dependency array <code>[]</code>, meaning they never change unless the component is unmounted and remounted.</li>
     <li>When <code>useCallback</code> is enabled, the <strong>same function instance</strong> is reused between renders, reducing re-rendering cost for <code>ChildButton</code> components.</li>
     <li>When disabled, new function instances are created on every render, simulating the default behavior without optimization.</li>
   </ul>`,

  `<strong>Why is this beneficial?</strong>
   Memoizing functions with <code>useCallback</code> can be crucial for performance if:
   <ul>
     <li>You're passing functions deep into a component tree.</li>
     <li>You're using <code>React.memo</code> or other memoization strategies on children.</li>
     <li>Your functions are heavy or depend on a stable identity to avoid rework.</li>
   </ul>
   In this case, although our functions are simple, the example teaches why and when it matters.`,

  `<strong>Best Practices for using useCallback:</strong>
   <ul>
     <li><strong>Use only when needed:</strong> Don't blindly wrap every function with <code>useCallback</code>. It adds slight memory cost and complexity — only optimize if a function causes noticeable re-renders or is passed to memoized children.</li>
     <li><strong>Manage dependencies carefully:</strong> Always include all external dependencies in the dependency array, or you might create stale closures.</li>
     <li><strong>Don't break the Rules of Hooks:</strong> Always call <code>useCallback</code> at the top level — never inside conditions or loops.</li>
   </ul>`,

  `<strong>Extra Tip:</strong> 
   If you're using <code>useCallback</code> to optimize child components, you often combine it with <code>React.memo</code> for maximum effect!`
];

export default useCallbackInformation;
