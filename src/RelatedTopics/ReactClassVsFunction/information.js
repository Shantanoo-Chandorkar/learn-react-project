const ReactClassVsFunctionInformation = [
  `<strong>What are Class and Functional Components?</strong><br/>
   In React, components can be created using either <strong>classes</strong> or <strong>functions</strong>.
   Both are used to build UI pieces, but they differ in syntax, features, and complexity.`,

  `<strong>Class Components:</strong><br/>
   A more traditional way to define components. They support full lifecycle methods and maintain internal state using <code>this.state</code>.
   <pre><code>
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return &lt;div&gt;Count: {this.state.count}&lt;/div&gt;;
  }
}
   </code></pre>`,

  `<strong>Functional Components:</strong><br/>
   A simpler and modern way of defining components. Originally stateless, but now can use state and side effects with Hooks.
   <pre><code>
import { useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);
  return &lt;div&gt;Count: {count}&lt;/div&gt;;
}
   </code></pre>`,

  `<strong>Key Differences:</strong>
   <table>
     <thead>
       <tr><th>Aspect</th><th>Class</th><th>Function</th></tr>
     </thead>
     <tbody>
       <tr><td>Syntax</td><td>Verbose, uses <code>this</code></td><td>Concise and cleaner</td></tr>
       <tr><td>State</td><td>via <code>this.state</code></td><td>via <code>useState</code></td></tr>
       <tr><td>Lifecycle</td><td>Class methods</td><td><code>useEffect</code> Hook</td></tr>
       <tr><td>Performance</td><td>Heavier</td><td>Lighter and preferred</td></tr>
     </tbody>
   </table>`,

  `<strong>Why Functional Components are Preferred:</strong>
   <ul>
     <li>Shorter, cleaner syntax</li>
     <li>Encourages use of Hooks for side effects, context, etc.</li>
     <li>Easier to test and reason about</li>
     <li>Better for code reuse through custom hooks</li>
   </ul>`,

  `<strong>When to use Class Components?</strong><br/>
   Legacy projects or when working with older libraries that rely on class-based patterns. 
   But for new development, functional components with Hooks are the standard.`,

  `<strong>Conclusion:</strong><br/>
   Functional components are the modern, flexible, and recommended way of writing React components.
   They simplify logic and make your app more scalable and maintainable.`
];

export default ReactClassVsFunctionInformation;
