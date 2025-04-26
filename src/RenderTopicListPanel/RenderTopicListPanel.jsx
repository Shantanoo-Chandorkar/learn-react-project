import React from "react";
import "./style.css";

const RenderTopicListPanel = ({ topics, onSelect }) => {
  return (
    <div className="render-topic-list-outer-container">
      <h3>Click on the topic to learn</h3>
      {topics.map((topic) => (
        <div key={topic.id} className="render-topic-list-single-topic-container">
          <p className="render-topic-list-title">{topic.title}</p>
          <button onClick={() => onSelect(topic.id)} className="render-topic-list-view-button">
            View
          </button>
        </div>
      ))}
    </div>
  )
}

export default RenderTopicListPanel;