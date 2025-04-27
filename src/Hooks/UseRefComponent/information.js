const useRefInformation = [
  `The <strong>useRef</strong> Hook is a special function in React that creates a mutable object that persists across renders.
   It is often used to reference DOM elements, store mutable values, or persist information without causing re-renders.`,

  `<strong>Syntax:</strong> <code>const myRef = useRef(initialValue);</code>`,

  `The <code>useRef</code> function returns a <strong>ref object</strong> with a single property called <code>current</code>.
   You can read and write to <code>current</code> without triggering a component re-render.`,

  `<strong>Best Practice (naming):</strong> 
   Name your refs descriptively, ending with "Ref" to indicate that it's a mutable ref object. 
   Examples: <code>inputRef</code>, <code>timerRef</code>, <code>saveTimeoutRef</code>, <code>isDirtyRef</code>.
   This improves readability and distinguishes refs from normal variables.`,

  `<strong>Why was useRef introduced?</strong>
   In class components, refs were created using <code>React.createRef()</code> or handled manually.
   <code>useRef</code> provides a simpler way to work with refs inside functional components, enabling powerful features like:
   <ul>
     <li>Persisting values across renders without triggering re-renders.</li>
     <li>Accessing and interacting with DOM nodes directly.</li>
     <li>Managing mutable "instance variables" inside components.</li>
   </ul>`,

  `<strong>Problem Solved:</strong>
   <code>useRef</code> solves two key problems:
   <ul>
     <li>Sometimes we need to store data across renders (like a previous value, a timer ID, or a mutable flag) without making the component re-render when that data changes.</li>
     <li>Sometimes we need direct access to a DOM element (e.g., focusing an input programmatically).</li>
   </ul>
   <code>useRef</code> handles both scenarios cleanly without affecting the render cycle.`,

  `<strong>How have we used useRef in our example?</strong>
   In our Advanced Form Tracker example, we used <code>useRef</code> in several powerful ways:
   <ul>
     <li><strong><code>currentInputRef</code>:</strong> Always holds the latest input value typed by the user (without causing re-renders).</li>
     <li><strong><code>previousInputRef</code>:</strong> Stores the value before the latest change, allowing us to track previous input instantly.</li>
     <li><strong><code>isDirtyRef</code>:</strong> Tracks whether the form has unsaved changes (used to warn users if they try to leave).</li>
     <li><strong><code>saveTimeoutRef</code>:</strong> Holds a timeout ID to debounce saving the draft into localStorage after the user stops typing.</li>
   </ul>
   Thanks to <code>useRef</code>, we managed these dynamic behaviors without unnecessary re-renders, leading to a smoother, faster user experience.`,

  `<strong>Why is this beneficial?</strong>
   Without <code>useRef</code>, we would have had to use <code>useState</code> for these intermediate values, causing unnecessary renders and making the app slower and harder to maintain.
   <code>useRef</code> keeps mutable values "outside" the rendering cycle while still making them accessible instantly.`,

  `<strong>Best Practices for using useRef:</strong>
   <ul>
     <li><strong>Only Use for Mutables or DOM:</strong> Prefer <code>useRef</code> for values that need to persist across renders but don't need to trigger UI updates.</li>
     <li><strong>Don't Read/Write <code>current</code> During Render:</strong> Avoid accessing or changing <code>ref.current</code> during the render phase — only do it inside event handlers, effects, or callbacks.</li>
     <li><strong>Keep Code Clear:</strong> Always add meaningful names to your refs (avoid vague names like <code>tempRef</code> unless absolutely necessary).</li>
     <li><strong>Use useRef Over useState for Imperative Values:</strong> If a value changes frequently but should not affect the UI, <code>useRef</code> is almost always the better choice.</li>
   </ul>`,

  `<strong>Extra Tip:</strong>
   Refs are also extremely useful for interacting with child components via <code>forwardRef</code> or managing third-party libraries that require manual DOM control.`,
];

export default useRefInformation;
