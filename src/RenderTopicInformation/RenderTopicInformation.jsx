import React from "react";
import "./style.css";

const RenderTopicInformation = ({ topic }) => {
  return (
    <div className="render-topic-information-outer-container">
      <h3>
        Information for <span className="highlighted-topic-title">{topic.title}</span>
      </h3>

      <div className="render-topic-information-container">
        {topic.info.map((detail, index) => (
          <p
            key={index}
            className="render-topic-information-single-detail"
            dangerouslySetInnerHTML={{ __html: detail }}
          />
        ))}
      </div>
    </div>
  );
};

export default RenderTopicInformation;
