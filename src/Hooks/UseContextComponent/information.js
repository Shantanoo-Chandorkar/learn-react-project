const useContextInformation = [
  `The <strong>useContext</strong> Hook in React is used to access data from a Context directly inside a component, without manually passing props down multiple levels.`,

  `<strong>Syntax:</strong> <code>const value = useContext(MyContext);</code>`,

  `<strong>Key Concepts:</strong>
   <ul>
     <li><strong>Context</strong>: A way to share global data (like themes, notifications, authentication status) across the entire component tree.</li>
     <li><strong>Provider</strong>: A special component that supplies the context value to its descendants.</li>
     <li><strong>Consumer</strong>: (Optional) An older pattern; <code>useContext</code> is the modern, simpler way to consume context data.</li>
   </ul>`,

  `<strong>When to use useContext:</strong>
   <ul>
     <li>When multiple components need access to the same data.</li>
     <li>When prop drilling (passing props down through many layers) becomes too messy or tedious.</li>
     <li>For things like user authentication, app themes, notifications, language settings, etc.</li>
   </ul>`,

  `<strong>Why was useContext introduced?</strong>
   Before <code>useContext</code>, components had to use the render-props pattern (<code>&lt;MyContext.Consumer&gt;</code>), which made code verbose and harder to read. 
   <code>useContext</code> allows direct access inside functional components with a single line.`,

  `<strong>Problem Solved:</strong>
   <ul>
     <li>Avoids manually passing props down several levels (no more "prop drilling").</li>
     <li>Makes code cleaner and easier to maintain when shared state is needed across different parts of the app.</li>
     <li>Encourages modular, centralized state management without setting up external libraries like Redux.</li>
   </ul>`,

  `<strong>How have we used useContext in our example?</strong>
   <ul>
     <li>Created two contexts: <code>NotificationContext</code> and <code>ThemeContext</code>.</li>
     <li><strong>NotificationProvider</strong> handles showing and hiding temporary notification messages (like "Profile updated!").</li>
     <li><strong>ThemeProvider</strong> manages light/dark mode switching and applies the selected theme to the outer container.</li>
     <li>Components like <strong>ProfileSettings</strong>, <strong>ProductPage</strong>, and <strong>ThemeSwitcher</strong> consume these contexts using <code>useContext</code>.</li>
   </ul>`,

  `<strong>Why is useContext better here than passing props?</strong>
   <ul>
     <li>ProfileSettings, ProductPage, and ThemeSwitcher are siblings — manually passing down props would be awkward and repetitive.</li>
     <li>Any future component (deeply nested) can easily access the notification or theme functions without needing any prop rewiring.</li>
     <li>Global events like theme changes or pop-up notifications stay centralized, easier to update in one place.</li>
   </ul>`,

  `<strong>Best Practices for useContext:</strong>
   <ul>
     <li>Keep your Context Providers small and focused — don't overload a single context with unrelated data.</li>
     <li>If your context value is complex (e.g., multiple functions, large objects), consider memoizing the value to avoid unnecessary re-renders.</li>
     <li>Prefer using multiple smaller contexts (like <code>ThemeContext</code> and <code>NotificationContext</code>) instead of one giant one.</li>
   </ul>`,

  `<strong>Extra Tip:</strong> 
   For even better performance and organization in larger apps, combine <code>useContext</code> with <code>useReducer</code> inside the Provider — this lets you manage complex global state more cleanly (like Redux, but without Redux!).`
];

export default useContextInformation;
