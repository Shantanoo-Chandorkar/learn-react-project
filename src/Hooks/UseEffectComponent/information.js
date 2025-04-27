const useEffectInformation = [
  `The <strong>useEffect</strong> Hook is a special function in React that lets you perform <strong>side effects</strong> inside functional components. Side effects include things like fetching data, manually updating the DOM, setting up subscriptions, and managing timers — anything that affects something outside the component itself.`,

  `<strong>Syntax:</strong> <code>useEffect(() => { /* side effect code */ }, [dependencies]);</code>`,

  `The <code>useEffect</code> function accepts two arguments:
   <ul>
     <li>A function that contains your side effect logic. This function can optionally return a <strong>cleanup function</strong>.</li>
     <li>A dependency array <code>[dependencies]</code> that controls when the effect should re-run.</li>
   </ul>
   The effect runs after the component has rendered, and re-runs whenever any of the dependencies change.`,

  `<strong>Best Practice (cleanup function):</strong> 
   If your side effect creates something that needs to be cleaned up (like a timer, subscription, or event listener), you should return a cleanup function inside <code>useEffect</code>. This ensures that React properly cleans up before running the effect again or when the component unmounts.`,

  `<strong>Why was useEffect introduced?</strong> 
   In class components, developers had to spread their side-effect logic across multiple lifecycle methods like <code>componentDidMount</code>, <code>componentDidUpdate</code>, and <code>componentWillUnmount</code>. 
   This made code harder to organize and understand.
   <code>useEffect</code> combines all these lifecycle behaviors into a single, consistent API for functional components, greatly simplifying side-effect management.`,

  `<strong>Problem Solved:</strong>
   Before Hooks, managing side effects inside functional components was not possible at all. Class components were mandatory even for simple effects, leading to boilerplate and complexity.
   <code>useEffect</code> allows functional components to handle side effects directly, keeping components smaller, cleaner, and easier to maintain.`,

  `<strong>How have we used useEffect in our example?</strong>
   We built a simple "Auto-Save Notes" application:
   <ul>
     <li>The user types into a text area, updating the <code>text</code> state.</li>
     <li><code>useEffect</code> watches for changes in <code>text</code>.</li>
     <li>Whenever <code>text</code> changes, it sets the status to "Saving..." and starts a 1-second timer.</li>
     <li>If the user stops typing for 1 second, the effect saves the text and updates the status to "Saved".</li>
     <li>If the user types again before 1 second, the previous timer is cleared and a new one is started (debouncing).</li>
   </ul>
   This ensures that notes are auto-saved efficiently without making unnecessary saves on every keystroke.`,

  `<strong>Why is this beneficial?</strong>
   Without <code>useEffect</code>, implementing debounced auto-save logic would have required a class component with manual management inside multiple lifecycle methods. 
   Using <code>useEffect</code> makes the logic much more readable, declarative, and tied closely to the state change it's responding to.`,

  `<strong>Best Practices for using useEffect:</strong>
   <ul>
     <li><strong>Declare Effects at the Top:</strong> Always place your <code>useEffect</code> calls at the top level of your component, never inside loops, conditions, or nested functions.</li>
     <li><strong>Use Cleanup Correctly:</strong> If you start a timer, subscription, or add an event listener, return a cleanup function to properly clean it up.</li>
     <li><strong>Specify Dependencies Properly:</strong> Always list all the variables your effect depends on inside the <code>[dependencies]</code> array. This ensures your effect stays in sync with your component state.</li>
     <li><strong>Use Multiple Effects:</strong> It's better to have multiple small, focused <code>useEffect</code> calls than one big one trying to handle unrelated logic.</li>
     <li><strong>Avoid Unnecessary Effects:</strong> Not all code belongs inside <code>useEffect</code>. If something can be handled directly during render (like deriving a value), you don't need an effect.</li>
     <li><strong>Understand Execution Timing:</strong> <code>useEffect</code> runs after the paint, so it does not block the browser from updating the screen.</li>
   </ul>`,

  `<strong>Extra Tip:</strong> If your effect becomes complicated (e.g., you are managing timers, fetching data, and listening to events all in one), it's usually a sign that you should <strong>split it into multiple effects</strong> or even move the logic into custom Hooks to keep your components clean and modular.`,
];

export default useEffectInformation;
