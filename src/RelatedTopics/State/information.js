const StateInformation = [
  `<strong>What is State?</strong><br/>
   In simple terms, <strong>state</strong> refers to any data that can change over time. 
   In React, <em>state</em> is a special built-in object that holds information about a component's current situation, and when the state changes, the component automatically <strong>re-renders</strong> to reflect those changes.`,

  `<strong>Technical definition:</strong><br/>
   State is a <code>mutable</code> piece of data that belongs to a component and controls how that component behaves and renders.<br/>
   In other words, <em>state is how React keeps track of things that should cause a UI update when they change</em>.`,

  `<strong>Common examples of State:</strong>
   <ul>
     <li><code>Loading status</code> — showing a spinner while data loads</li>
     <li><code>Form inputs</code> — tracking user input values</li>
     <li><code>Modal visibility</code> — toggling open/close state of a popup</li>
     <li><code>Authentication state</code> — knowing if a user is logged in or not</li>
     <li><code>Pagination</code> — tracking which page is currently active</li>
   </ul>`,

  `<strong>Simple real-world example:</strong><br/>
   Suppose you are fetching data from an API. Initially, you want to display a loading spinner until the data is fetched.<br/>
   You can manage this using a <code>showLoader</code> state:
   <ul>
     <li>Initially, <code>showLoader</code> is <code>false</code> (no loading spinner).</li>
     <li>When API request starts, set <code>showLoader</code> to <code>true</code>.</li>
     <li>When data arrives, set <code>showLoader</code> back to <code>false</code>.</li>
   </ul>
   React will automatically re-render the component based on the current value of <code>showLoader</code>.`,

  `<strong>How do you create State in React?</strong><br/>
   In functional components, you create state using the <code>useState</code> Hook:
   <pre><code>
import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  return (
    &lt;button onClick={() => setCount(count + 1)&gt;
      Clicked {count} times
    &lt;/button&gt;
  );
}
   </code></pre>
   Here, <code>count</code> is the state variable, and <code>setCount</code> is the function to update it.`,

  `<strong>Important points about State:</strong>
   <ul>
     <li>Changing state triggers a <strong>re-render</strong>.</li>
     <li>State updates are <strong>asynchronous</strong> — multiple updates may be batched together for performance.</li>
     <li>Never directly modify state (e.g., <code>state.value = newValue</code>); always use the updater function provided by <code>useState</code>.</li>
     <li>Each instance of a component has its own independent state.</li>
   </ul>`,

  `<strong>Final thought:</strong><br/>
   Managing state efficiently is the backbone of building <strong>dynamic</strong> and <strong>interactive</strong> React applications. 
   Understanding when and how to use state correctly is critical for writing clean, maintainable code.`
];

export default StateInformation;
