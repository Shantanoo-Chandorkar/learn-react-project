import { useState } from "react";
import RenderTopicInformation from "../RenderTopicInformation/RenderTopicInformation";

const RenderTopicDetails = ({ type, topic }) => {

  const ExampleComponent = topic.example;

  if (type === "info") {
    return (
      <div className="render-topic-details-outer-container">
        <RenderTopicInformation topic={topic} />
      </div>
    )
  }

  if (type === "example") {
    return (
      <div className="render-topic-example-outer-container">
        <ExampleComponent />
      </div>
    )
  }
}

export default RenderTopicDetails;