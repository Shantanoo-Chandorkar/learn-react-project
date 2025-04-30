const VirtualDomInformation = [
  `<strong>What is the Virtual DOM?</strong><br/>
   The <strong>Virtual DOM (VDOM)</strong> is a lightweight JavaScript representation of the actual DOM (Document Object Model). 
   It acts as a copy of the real DOM that React uses to optimize UI rendering.`,

  `<strong>Why was the Virtual DOM introduced?</strong><br/>
   Directly manipulating the real DOM is slow and expensive in terms of performance. 
   The Virtual DOM allows React to <strong>batch and minimize</strong> updates by comparing old and new versions of the virtual DOM 
   and only applying the necessary changes to the actual DOM.`,

  `<strong>How does it work?</strong>
   <ol>
     <li>React creates a Virtual DOM when the component renders.</li>
     <li>When state or props change, a new Virtual DOM is created.</li>
     <li>React compares the old and new Virtual DOMs using a process called <strong>diffing</strong>.</li>
     <li>Only the changed elements (called <em>patches</em>) are updated in the real DOM.</li>
   </ol>`,

  `<strong>Benefits of using Virtual DOM:</strong>
   <ul>
     <li><strong>Performance</strong> – Minimizes actual DOM operations</li>
     <li><strong>Efficiency</strong> – Updates are batched and optimized</li>
     <li><strong>Declarative code</strong> – Lets you describe "what" the UI should look like</li>
     <li><strong>Cross-platform</strong> – Enables frameworks like React Native to use similar concepts</li>
   </ul>`,

  `<strong>Analogy:</strong><br/>
   Think of the Virtual DOM like a <em>draft paper</em>. Instead of making changes directly on the final artwork (real DOM),
   you make changes on the draft (Virtual DOM), compare it with the previous version, and only change the parts that differ on the final copy.`,

  `<strong>Key takeaway:</strong><br/>
   The Virtual DOM is a core innovation in React that allows efficient, fast, and smooth updates to the UI without directly working with the real DOM every time.`
];

export default VirtualDomInformation;
