const useMemoInformation = [
  `The <strong>useMemo</strong> Hook is a special function in React that lets you memoize (remember) the result of a calculation between renders.
   It optimizes performance by recomputing a value <strong>only when its dependencies change</strong>, instead of on every render.`,

  `<strong>Syntax:</strong> <code>const memoizedValue = useMemo(() => computeSomething(a, b), [a, b]);</code>`,

  `The <code>useMemo</code> function takes two arguments:
   <ul>
     <li>A function that returns the computed value.</li>
     <li>An array of dependencies. The memoized value will only recompute when one of these dependencies changes.</li>
   </ul>
   It returns the memoized (cached) result.`,

  `<strong>Best Practice (naming):</strong>
   Name the result of <code>useMemo</code> descriptively based on what it computes. 
   For example, <code>filteredItems</code>, <code>sortedList</code>, or <code>expensiveResult</code>.
   This improves readability and immediately shows developers it is a derived value.`,

  `<strong>Why was useMemo introduced?</strong> 
   Without <code>useMemo</code>, functions that perform expensive calculations (sorting, filtering, transforming data) would re-run on every single render, even if the inputs hadn't changed.
   <code>useMemo</code> was introduced to give developers a way to avoid unnecessary work by caching expensive computations.`,

  `<strong>Problem Solved:</strong>
   <code>useMemo</code> prevents performance bottlenecks by:
   <ul>
     <li>Skipping heavy computations when inputs haven't changed.</li>
     <li>Making React apps faster and smoother, especially when working with large datasets or complex calculations.</li>
     <li>Keeping components efficient without manually managing caching logic.</li>
   </ul>`,

  `<strong>How have we used useMemo in our example?</strong>
   In our Product Catalog example, we had:
   <ul>
     <li>A huge list of <strong>2 million products</strong> generated at runtime.</li>
     <li>A function <code>heavyFilterAndSort()</code> that filters and sorts the products based on a user's search query.</li>
   </ul>
   Without optimization, filtering and sorting would have re-executed every time the component rendered — even when unrelated state (like <code>cart</code>) changed.  
   To solve this, we wrapped the expensive operation with <code>useMemo</code>:
   <ul>
     <li>The products are only re-filtered and re-sorted when the <code>debouncedSearch</code> value changes.</li>
     <li>Updating other state like the shopping cart doesn't re-trigger the heavy calculation when <code>useMemoEnabled</code> is true.</li>
   </ul>
   This greatly improved the performance and responsiveness of the app, especially when typing search queries quickly!`,

  `<strong>Why is this beneficial?</strong>
   Without <code>useMemo</code>, every tiny update (even unrelated ones) would cause the entire 2 million product list to be filtered and sorted again, freezing or slowing down the app.
   <code>useMemo</code> ensures that expensive operations happen only when necessary, keeping the user experience fast and smooth.`,

  `<strong>Best Practices for using useMemo:</strong>
   <ul>
     <li><strong>Don't Prematurely Optimize:</strong> Only use <code>useMemo</code> when you actually face performance problems or expect heavy calculations. Overusing it can make code harder to read without real benefit.</li>
     <li><strong>Choose Dependencies Carefully:</strong> Always include every value your computation relies on inside the dependency array to avoid bugs or stale values.</li>
     <li><strong>Use Pure Functions:</strong> The computation function should be pure — no side effects — so React can safely cache it without issues.</li>
     <li><strong>Profile First:</strong> Use React DevTools or browser profiling to verify performance issues before introducing <code>useMemo</code>.</li>
   </ul>`,

  `<strong>Extra Tip:</strong>
   If your memoized result is an object, array, or function passed as a prop to a child component, <code>useMemo</code> can help prevent unnecessary child re-renders, especially when combined with <code>React.memo</code>.`,
];

export default useMemoInformation;
