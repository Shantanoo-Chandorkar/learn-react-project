const ReactRouterInformation = [
  `<strong>React Router</strong> is the standard routing library for React. It enables navigation among views of various components in a React Application, and allows for dynamic URL handling to facilitate single-page applications (SPAs).`,

  `<strong>Core Concepts of React Router:</strong>
    <ul>
      <li><strong>Route</strong>: A component that maps a URL path to a React component. It’s the primary way to specify which component to render based on the current URL.</li>
      <li><strong>Link</strong>: A component that enables navigation to different routes. It’s like an anchor ('< a > ') tag in HTML, but it prevents the page from reloading and performs a client-side navigation.</li>
      <li><strong>Switch</strong>: A component that renders the first matching <code>Route</code> or <code>Redirect</code>. It helps to ensure that only one route is rendered at a time.</li>
      <li><strong>BrowserRouter</strong>: A component that enables the use of the HTML5 history API for URL management (the most common Router used in React).</li>
      <li><strong>HashRouter</strong>: A Router that uses hash-based routing (for when the server does not support HTML5 history API).</li>
      <li><strong>Route Rendering Types:</strong>
        <ul>
          <li><strong>Component</strong>: Directly renders a component when the route is matched.</li>
          <li><strong>Render</strong>: Renders an inline function, which can return JSX dynamically based on the route match.</li>
          <li><strong>Children</strong>: A function that returns JSX for nested routes or further conditional rendering.</li>
        </ul>
      </li>
    </ul>`,

  `<strong>Commonly Used Components in React Router:</strong>
    <ul>
      <li><strong>Route</strong>: Maps a path to a component.</li>
      <li><strong>Switch</strong>: Ensures only one route is rendered at a time by rendering the first matched route.</li>
      <li><strong>Link</strong>: Used for navigation between routes without reloading the page.</li>
      <li><strong>NavLink</strong>: Similar to <code>Link</code>, but allows styling the active link with the <code>activeClassName</code> or <code>activeStyle</code> props.</li>
      <li><strong>Redirect</strong>: Redirects from one route to another.</li>
    </ul>`,

  `<strong>Routing with Params:</strong>
    <ul>
      <li>React Router allows passing parameters in the URL, which can be captured in the component. This can be done using <code>:paramName</code> in the path.</li>
      <li>Example: <code><Route path="/user/:userId" component={UserPage} /></code> will render the <code>UserPage</code> component, and you can access the <code>userId</code> via <code>props.match.params.userId</code> inside <code>UserPage</code>.</li>
    </ul>`,

  `<strong>How React Router Works:</strong>
    <ul>
      <li>React Router uses the <code>history</code> object (via <code>BrowserRouter</code>) to listen to changes in the URL and update the view accordingly.</li>
      <li>When a URL matches a defined route, React Router renders the corresponding component.</li>
      <li>Each route can be a <code>Route</code> that matches a URL pattern or a set of matching patterns defined in the <code>Switch</code> component.</li>
      <li>The application doesn't reload the page; instead, it uses JavaScript to render different views, making the app feel like a single-page application (SPA).</li>
    </ul>`,

  `<strong>When to Use React Router:</strong>
    <ul>
      <li>When building single-page applications (SPA) where the page doesn’t reload on navigation.</li>
      <li>When your app needs multiple views or screens that need to be navigable with different URLs.</li>
      <li>When you want to manage navigation and URL changes within your React app without relying on server-side routing.</li>
    </ul>`,

  `<strong>How React Router Solves Common Problems:</strong>
    <ul>
      <li>It provides a declarative way of handling navigation, meaning that your app doesn’t have to manage the logic of showing different views based on the current URL.</li>
      <li>It makes it possible to create clean and readable URLs that are tied to the state of the app.</li>
      <li>It reduces the complexity of handling navigation manually, instead managing it in one central place (the Router component).</li>
    </ul>`,

  `<strong>Best Practices for React Router:</strong>
    <ul>
      <li><strong>Use Routes with Dynamic Paths</strong>: Use parameters in your path (e.g., <code>/user/:id</code>) to handle dynamic views based on the URL.</li>
      <li><strong>Keep Routes Declarative</strong>: Avoid conditional logic inside the route components. Use separate routes for different views instead.</li>
      <li><strong>Utilize Route Nesting</strong>: When you have nested views (e.g., dashboard, settings, etc.), take advantage of nested routes to organize components effectively.</li>
      <li><strong>Use <code>NavLink</code> for Active States</strong>: Use <code>NavLink</code> over <code>Link</code> to automatically style active routes.</li>
      <li><strong>Avoid Overuse of Redirect</strong>: Redirects should only be used for specific use cases, such as redirecting from old URLs or handling 404s.</li>
    </ul>`,

  `<strong>Why React Router is Important for SPAs:</strong>
    <ul>
      <li>Single-page applications (SPA) require a mechanism to handle navigation between different views or screens. React Router provides this mechanism in a seamless way.</li>
      <li>It allows the URL to reflect the state of your application, so users can bookmark or refresh the page without losing their current state.</li>
    </ul>`,

  `<strong>Extra Tip:</strong> 
   Consider using <code>useLocation</code> and <code>useHistory</code> hooks to access the current location and history objects within your functional components for advanced routing and navigation features.`
];

export default ReactRouterInformation;
