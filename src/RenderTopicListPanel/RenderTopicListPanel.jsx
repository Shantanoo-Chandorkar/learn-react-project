import React from "react";
import "./style.css";

const RenderTopicListPanel = ({ topics, onSelect, contentRef }) => {
  const hookTopics = topics.filter((topic) => topic.category === "hooks");
  const relatedTopics = topics.filter((topic) => topic.category === "related-topics");

  const handleViewClick = (id) => {
    onSelect(id);
    if (contentRef?.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" }); // fallback
    }
  };

  return (
    <div className="render-topic-list-outer-container">
      <h3>Click on the topic to learn</h3>

      {/* Hooks Section */}
      {hookTopics.length > 0 && (
        <>
          <h4 className="render-topic-list-section-header">Hooks</h4>
          {hookTopics.map((topic) => (
            <div key={topic.id} className="render-topic-list-single-topic-container">
              <p className="render-topic-list-title">{topic.title}</p>
              <button
                onClick={() => handleViewClick(topic.id)}
                className="render-topic-list-view-button"
              >
                View
              </button>
            </div>
          ))}
        </>
      )}

      {/* Related Topics Section */}
      {relatedTopics.length > 0 && (
        <>
          <h4 className="render-topic-list-section-header">Related Topics</h4>
          {relatedTopics.map((topic) => (
            <div key={topic.id} className="render-topic-list-single-topic-container">
              <p className="render-topic-list-title">{topic.title}</p>
              <button
                onClick={() => handleViewClick(topic.id)}
                className="render-topic-list-view-button"
              >
                View
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default RenderTopicListPanel;
