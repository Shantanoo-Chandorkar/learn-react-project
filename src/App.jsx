import { useState } from 'react'
import './App.css'

// Import Dependencies
import RenderTopicListPanel from './RenderTopicListPanel/RenderTopicListPanel';

import { topics } from './topics/topic-list';
import RenderTopicInformationPanel from './RenderTopicInformationPanel/RenderTopicInformationPanel';
import RenderTopicExamplePanel from './RenderTopicExamplePanel/RenderTopicExamplePanel';

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleSelectedTopic = (topicId) => {
    const topic = topics.find(t => t.id === topicId);
    setSelectedTopic(topic);
  }

  const hasExample = selectedTopic && selectedTopic.example;

  return (
    <div className='learn-react-project-outer-container'>
      {/* Move the header to the component afterwards */}
      <header className='learn-react-project-header'>Welcome to React Tutorial</header>

      <div className='learn-react-project-topic-container'>
        {/* Left Section */}
        <div className='learn-react-project-left-section-outer-container'>
          <RenderTopicListPanel topics={topics} onSelect={handleSelectedTopic} />
        </div>

        {/* Middle Section */}
        <div className={
          hasExample ?
            'learn-react-project-middle-section-outer-container' :
            'learn-react-project-middle-section-expanded-outer-container'
        }>
          <RenderTopicInformationPanel topic={selectedTopic} />
        </div>

        {/* Right Section (Show only if the example is present in the topic) */}
        {hasExample && (
          <div className='learn-react-project-right-section-outer-container'>
            <RenderTopicExamplePanel topic={selectedTopic} />
          </div>
        )}
      </div>

    </div>
  )
}

export default App
