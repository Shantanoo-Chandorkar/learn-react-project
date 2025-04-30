const ReactComponentLifeCycleInformation = [
  `<strong>What is the Component Lifecycle?</strong><br/>
   The <strong>component lifecycle</strong> refers to the series of methods and phases a React component goes through from creation to destruction. 
   Understanding it helps in managing side effects, subscriptions, and cleanups.`,

  `<strong>Three main phases:</strong>
   <ul>
     <li><strong>Mounting</strong>: Component is being created and inserted into the DOM.</li>
     <li><strong>Updating</strong>: Component is re-rendered due to changes in props or state.</li>
     <li><strong>Unmounting</strong>: Component is removed from the DOM.</li>
   </ul>`,

  `<strong>Lifecycle in Class Components:</strong>
   <ul>
     <li><code>constructor()</code> – Initialize state and bind methods.</li>
     <li><code>componentDidMount()</code> – Called after component is rendered. Best for fetching data.</li>
     <li><code>componentDidUpdate()</code> – Called after updates. Used to respond to changes in props/state.</li>
     <li><code>componentWillUnmount()</code> – Called before component is removed. Used for cleanup.</li>
   </ul>`,

  `<strong>Lifecycle in Functional Components (with Hooks):</strong><br/>
   Hooks allow functional components to tap into lifecycle behavior using <code>useEffect</code>.
   <pre><code>
useEffect(() => {
  // Runs on mount and update

  return () => {
    // Cleanup logic (like componentWillUnmount)
  };
}, [dependencies]); // Runs when dependencies change
   </code></pre>`,

  `<strong>Why it matters:</strong><br/>
   Managing lifecycle properly ensures your app avoids memory leaks, unnecessary re-renders, and broken state.`,

  `<strong>Real-world examples:</strong>
   <ul>
     <li>Start an API request in <code>componentDidMount()</code>.</li>
     <li>Listen to browser resize events and remove listeners in <code>componentWillUnmount()</code>.</li>
     <li>React to prop changes in <code>componentDidUpdate()</code>.</li>
   </ul>`,

  `<strong>Conclusion:</strong><br/>
   Mastering the component lifecycle helps you build efficient, stable, and responsive applications using React.`
];

export default ReactComponentLifeCycleInformation;
