const SideEffectsInformation = [
  `<strong>What are Side Effects?</strong><br/>
   In layman's terms, a <strong>side effect</strong> is anything that happens as a consequence of a certain action or interaction that is not purely internal to a component. 
   In React, side effects commonly occur due to things like <code>state</code> changes, <code>prop</code> updates, or even lifecycle events.`,

  `<strong>Simple definition:</strong><br/>
   <em>A side effect is an interaction with the outside world or a system outside of the component’s rendering logic.</em> 
   It goes beyond just calculating and returning JSX.`,

  `<strong>Common examples of Side Effects in React:</strong>
   <ul>
     <li>Fetching data from an API</li>
     <li>Directly manipulating the DOM (e.g., focusing an input)</li>
     <li>Setting up subscriptions or event listeners (e.g., WebSocket connections)</li>
     <li>Manually changing the page title or scroll position</li>
     <li>Timers like <code>setTimeout</code> and <code>setInterval</code></li>
     <li>Logging values or analytics (e.g., sending tracking events)</li>
   </ul>`,

  `<strong>Why do we need to handle Side Effects separately?</strong><br/>
   React’s rendering should be <strong>pure</strong> — meaning for the same inputs (state/props), a component should always return the same output (JSX).
   Side effects, by nature, introduce interactions with systems outside React (like APIs or the browser), which means they can't be predicted by just looking at the component's inputs.
   To keep components predictable and maintainable, React provides special Hooks like <code>useEffect</code> to manage these side effects.`,

  `<strong>Side Effects and State Changes:</strong><br/>
   When a <code>state</code> change happens, it can trigger side effects.<br/>
   For example:
   <ul>
     <li>User clicks a button ➔ state updates ➔ fetch a new list from server ➔ update the UI.</li>
     <li>A countdown timer ➔ every second, the time state updates ➔ UI re-renders.</li>
   </ul>
   Side effects <strong>depend</strong> on the new state, and React lets you control exactly when and how these side effects happen.`,

  `<strong>Important rules about Side Effects:</strong>
   <ul>
     <li>Side effects should not directly happen during rendering. Only inside <code>useEffect</code> or similar Hooks.</li>
     <li>Always clean up side effects if needed (e.g., unsubscribe events, clear timers) to prevent memory leaks.</li>
     <li>Make sure effects have correct dependencies to avoid unexpected behavior (use the <code>dependency array</code> carefully in <code>useEffect</code>).</li>
   </ul>`,

  `<strong>React tools for handling Side Effects:</strong>
   <ul>
     <li><code>useEffect</code> — the standard Hook to handle side effects inside functional components.</li>
     <li><code>useLayoutEffect</code> — similar to <code>useEffect</code>, but fires synchronously after all DOM mutations (for critical UI changes).</li>
     <li><code>useInsertionEffect</code> — used mainly for styling libraries (rare cases).</li>
   </ul>`,

  `<strong>Final thought:</strong><br/>
   Controlling side effects properly is crucial for building <strong>stable</strong>, <strong>predictable</strong>, and <strong>efficient</strong> React applications. 
   Without structured side-effect management, applications can quickly become buggy, hard to debug, and unpredictable.`
];

export default SideEffectsInformation;
