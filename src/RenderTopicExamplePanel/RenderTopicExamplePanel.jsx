import RenderTopicDetails from "../RenderTopicDetails/RenderTopicDetails";

const RenderTopicExamplePanel = ({ topic }) => {
  if (!topic) {
    return <h6>Please select a topic to see the example</h6>
  }

  return (
    <div className="render-topic-example-outer-container">
      <h3>Example for the {topic.title} below</h3>
      <RenderTopicDetails type="example" topic={topic} />
    </div>
  )
}


export default RenderTopicExamplePanel;