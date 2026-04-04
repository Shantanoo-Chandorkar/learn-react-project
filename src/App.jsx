import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import './App.css';

// Layout and Core Components
import Layout from './components/layout/Layout';
import Home from './Pages/Home';
import TopicContainer from './components/TopicContainer';
import MDXComponents from './components/mdx/MDXComponents';

// Router Page Components (Imported directly to be merged into the main route tree)
import ReactForm from './Pages/ReactForm';
import MultiPageForm from './Pages/MultiPageForm';
import MultiStepFlow from './MultiStepFlow/MultiStepFlow';

/**
 * Main App Component
 *
 * This component sets up the primary routing for the application.
 * It uses the Layout component to wrap all routes and provide consistent UI.
 */
function App() {
  return (
    <MDXProvider components={MDXComponents}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Home page route */}
          <Route index element={<Home />} />

          {/* Redirect old path /react-router to topic/react-router */}
          <Route path="react-router" element={<Navigate to="/topic/react-router" replace />} />

          {/* Dynamic Topic route */}
          <Route path="topic/:slug" element={<TopicContainer />} />

          <Route path="react-form" element={<ReactForm />} />
          <Route path="multi-form" element={<MultiPageForm />} />
          <Route path="multi-step-flow" element={<MultiStepFlow />} />

          {/* Catch-all for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </MDXProvider>
  );
}

export default App;
