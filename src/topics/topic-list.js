// Import useState Hook Details
import useStateInformation from "../Hooks/UseStateComponent/information";
import UseStateComponentExample from "../Hooks/UseStateComponent/UseStateComponentExample";
// Import useEffect Hook Details
import useEffectInformation from "../Hooks/UseEffectComponent/information";
import UseEffectComponentExample from "../Hooks/UseEffectComponent/UseEffectComponentExample";
// Import State Details
import StateInformation from "../RelatedTopics/State/information";
// Import Side Effects Details
import SideEffectsInformation from "../RelatedTopics/SideEffects/information";

export const topics = [
  {
    id: 1,
    title: "useState",
    info: useStateInformation,
    example: UseStateComponentExample,
    category: "hooks",
  },
  {
    id: 2,
    title: "useEffect",
    info: useEffectInformation,
    example: UseEffectComponentExample,
    category: "hooks",
  },
  {
    id: 3,
    title: "State",
    info: StateInformation,
    category: "related-topics",
  },
  {
    id: 4,
    title: "Side Effects",
    info: SideEffectsInformation,
    category: "related-topics",
  },
];
