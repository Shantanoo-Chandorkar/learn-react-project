import React from "react";
import RenderTopicInformation from "../RenderTopicInformation/RenderTopicInformation";
import { topics } from "../topics/topic-list";

const ReactRouterBestPractices = () => {

  const topic = topics.find((i) => i.title === "React Router Best Practices");
  return (
    <div className="render-topic-details-outer-container">
      <RenderTopicInformation topic={topic} />
    </div>
  )
}

export default ReactRouterBestPractices;