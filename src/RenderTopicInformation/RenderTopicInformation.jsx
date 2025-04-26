import React from "react";

const RenderTopicInformation = ({ topic }) => {
  return (
    <div className="render-topic-information-outer-container">
      <h3>Information for {topic.title}</h3>

      <div className="render-topic-information-container">
        {topic.info.map((detail, index) => (
          <p key={index} className="render-topic-information-single-detail">{detail}</p>
        ))}
      </div>
    </div>
  )
}

export default RenderTopicInformation;