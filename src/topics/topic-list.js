// Import State Details
import StateInformation from "../RelatedTopics/State/information";
// Import useState Hook Details
import useStateInformation from "../Hooks/UseStateComponent/information";
import UseStateComponentExample from "../Hooks/UseStateComponent/UseStateComponentExample";

export const topics = [
  {
    id: 1,
    title: "state",
    info: StateInformation,
  },
  {
    id: 2,
    title: "useState",
    info: useStateInformation,
    example: UseStateComponentExample
  }
];
