const ReactRouterBestPracticesInformation = [
  `<strong>React Router Best Practices</strong> help ensure that your application's navigation logic is clean, efficient, and scalable. These tips are especially useful for larger or production-level applications.`,

  `<strong>1. Use a Dedicated Router File:</strong>
   <ul>
     <li>Create a separate <code>Routes.jsx</code> or <code>AppRoutes.jsx</code> file to define all routes in one centralized place.</li>
     <li>This keeps your <code>App.js</code> or main layout clean and focused on structure rather than route definitions.</li>
   </ul>`,

  `<strong>2. Organize Routes by Feature:</strong>
   <ul>
     <li>Group routes and components by feature or domain (e.g., user, dashboard, admin).</li>
     <li>This helps scale your routing as your application grows, making it easier to maintain.</li>
   </ul>`,

  `<strong>3. Use <code>NavLink</code> Instead of <code>Link</code> for Navigation:</strong>
   <ul>
     <li><code>NavLink</code> provides styling hooks like <code>activeClassName</code> or <code>isActive</code> for highlighting active routes.</li>
     <li>It's ideal for navbars or side menus where the current route should be visually distinct.</li>
   </ul>`,

  `<strong>4. Use Dynamic Route Params Where Appropriate:</strong>
   <ul>
     <li>Use <code>:param</code> syntax to match dynamic values in URLs (e.g., <code>/user/:userId</code>).</li>
     <li>Access route parameters using <code>useParams()</code> inside your component.</li>
     <li>This is cleaner and more scalable than hardcoding paths for every possible item.</li>
   </ul>`,

  `<strong>5. Use Route Nesting for Structured Layouts:</strong>
   <ul>
     <li>Define parent-child relationships between routes using nested <code>&lt;Route&gt;</code> components.</li>
     <li>For example, a <code>Dashboard</code> route can contain nested routes like <code>/dashboard/profile</code> or <code>/dashboard/settings</code>.</li>
     <li>This keeps your layout components reusable and intuitive.</li>
   </ul>`,

  `<strong>6. Handle 404s and Redirects Gracefully:</strong>
   <ul>
     <li>Include a catch-all route like <code>&lt;Route path="*" element={<NotFound />} /&gt;</code> to show a 404 page when no route matches.</li>
     <li>Use <code>&lt;Navigate to="/login" /&gt;</code> or <code>useNavigate()</code> to handle programmatic redirects.</li>
   </ul>`,

  `<strong>7. Avoid Anonymous Functions in <code>element</code> Props:</strong>
   <ul>
     <li>Don't write inline JSX or functions in <code>element={() => &lt;Component /&gt;}</code>. Instead, use <code>element={<Component />}</code>.</li>
     <li>It improves performance and avoids unnecessary re-renders.</li>
   </ul>`,

  `<strong>8. Use <code>useLocation</code> for Conditional UI:</strong>
   <ul>
     <li>Use the <code>useLocation()</code> hook to get the current pathname and apply logic conditionally.</li>
     <li>Example: Show or hide navigation bar depending on the current route (e.g., hide it on <code>/login</code> or <code>/signup</code>).</li>
   </ul>`,

  `<strong>9. Protect Private Routes:</strong>
   <ul>
     <li>Create a <code>PrivateRoute</code> component that checks authentication and redirects unauthenticated users.</li>
     <li>This is crucial for apps with user roles, authentication, or dashboards.</li>
     <li>Can be done using wrappers or layout-based route guards.</li>
   </ul>`,

  `<strong>10. Use Suspense and Lazy Loading for Route Splitting:</strong>
   <ul>
     <li>Use <code>React.lazy()</code> and <code>Suspense</code> to load components on demand.</li>
     <li>This improves performance and speeds up initial load time.</li>
     <li>Example:
       <pre><code>
const Settings = React.lazy(() => import('./Settings'));
&lt;Suspense fallback={<Loader />} &gt;
  &lt;Route path="/settings" element={<Settings />} /&gt;
&lt;/Suspense&gt;
       </code></pre>
     </li>
   </ul>`,

  `<strong>11. Avoid Re-Renders Using Memoization:</strong>
   <ul>
     <li>If you're passing data or functions via route props, memoize them with <code>useMemo</code> or <code>useCallback</code> to avoid unnecessary re-renders.</li>
     <li>Helps maintain performance, especially in nested or complex route components.</li>
   </ul>`,

  `<strong>12. Keep Route Paths Consistent and Readable:</strong>
   <ul>
     <li>Use kebab-case or lowercase for route paths (e.g., <code>/user-profile</code> instead of <code>/UserProfile</code>).</li>
     <li>This keeps your URLs user-friendly and SEO-consistent.</li>
   </ul>`,

  `<strong>Extra Tip:</strong>
   Use <code>Outlet</code> and <code>useOutletContext</code> to share layout data across nested routes instead of prop drilling or creating extra contexts. This works well with layout components like sidebars, headers, or tabs.`
];

export default ReactRouterBestPracticesInformation;
