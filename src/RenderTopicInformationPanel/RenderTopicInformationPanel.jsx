import { useState } from "react";
import RenderTopicDetails from "../RenderTopicDetails/RenderTopicDetails";

const RenderTopicInformationPanel = ({ topic }) => {

  if (!topic) {
    return (
      <h6>Please select a topic to learn</h6>
    )
  }

  return (
    <div className="render-topic-information-outer-container">
      <RenderTopicDetails type="info" topic={topic} />
    </div>
  )
}

export default RenderTopicInformationPanel;