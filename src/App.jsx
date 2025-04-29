import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';

// Import Dependencies
import RenderTopicListPanel from './RenderTopicListPanel/RenderTopicListPanel';
import { topics } from './topics/topic-list';
import RenderTopicInformationPanel from './RenderTopicInformationPanel/RenderTopicInformationPanel';
import RenderTopicExamplePanel from './RenderTopicExamplePanel/RenderTopicExamplePanel';

// Import Utilities
import Header from './Header/Header';

// Import Routes
import AppRoutes from './Router/Routes';

function App() {
  const location = useLocation();
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Responsive Code
  const [activeMobilePanel, setActiveMobilePanel] = useState('info');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectedTopic = (topicId) => {
    const topic = topics.find(t => t.id === topicId);
    setSelectedTopic(topic);

    // Switch to the "info" tab automatically when a topic is selected on mobile
    if (isMobileView) {
      setActiveMobilePanel('info');
    }
  };

  const hasExample = selectedTopic && selectedTopic.example;

  // These are the routes where we want to show the paths
  const isRouterPath = location.pathname.startsWith("/react-router") ||
    location.pathname.startsWith("/react-form") ||
    location.pathname.startsWith("/multi-form") ||
    location.pathname.startsWith("/multi-step-flow");

  return (
    <div className='learn-react-project-outer-container'>
      {/* Move the header to the component afterwards */}
      <Header />

      {isRouterPath ? (
        <AppRoutes />
      ) : (
        <>
          {isMobileView ? (
            <>
              <div className="mobile-tab-buttons">
                <button onClick={() => setActiveMobilePanel('list')}>Topics</button>
                <button onClick={() => setActiveMobilePanel('info')}>Info</button>
                {hasExample && <button onClick={() => setActiveMobilePanel('example')}>Example</button>}
              </div>

              <div className="mobile-tab-content">
                {activeMobilePanel === 'list' && (
                  <RenderTopicListPanel topics={topics} onSelect={handleSelectedTopic} />
                )}
                {activeMobilePanel === 'info' && (
                  <RenderTopicInformationPanel topic={selectedTopic} />
                )}
                {activeMobilePanel === 'example' && hasExample && (
                  <RenderTopicExamplePanel topic={selectedTopic} />
                )}
              </div>
            </>
          ) : (
            <div className='learn-react-project-topic-container'>
              <div className='learn-react-project-left-section-outer-container'>
                <RenderTopicListPanel topics={topics} onSelect={handleSelectedTopic} />
              </div>

              <div className={
                hasExample ? 'learn-react-project-middle-section-outer-container' :
                  'learn-react-project-middle-section-expanded-outer-container'
              }>
                <RenderTopicInformationPanel topic={selectedTopic} />
              </div>

              {hasExample && (
                <div className='learn-react-project-right-section-outer-container'>
                  <RenderTopicExamplePanel topic={selectedTopic} />
                </div>
              )}
            </div>
          )}
        </>
      )}


    </div>
  )
}

export default App
