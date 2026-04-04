import React from 'react';

const Home = () => {
  return (
    <div className="home-page">
      <h1>Welcome to the Learn React Platform</h1>
      <p>
        Select a topic from the sidebar to start learning about different React concepts, hooks, and
        patterns.
      </p>
      <div
        className="features-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem',
        }}
      >
        <div
          className="feature-card"
          style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}
        >
          <h3>Hooks</h3>
          <p>Deep dive into useState, useEffect, useContext, and more.</p>
        </div>
        <div
          className="feature-card"
          style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}
        >
          <h3>Routing</h3>
          <p>Learn how to manage navigation with React Router.</p>
        </div>
        <div
          className="feature-card"
          style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}
        >
          <h3>State Management</h3>
          <p>Understand local, lifted, and global state (Zustand).</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
