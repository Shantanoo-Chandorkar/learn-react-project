// Import useState Hook Details
import useStateInformation from "../Hooks/UseStateComponent/information";
import UseStateComponentExample from "../Hooks/UseStateComponent/UseStateComponentExample";
// Import useEffect Hook Details
import useEffectInformation from "../Hooks/UseEffectComponent/information";
import UseEffectComponentExample from "../Hooks/UseEffectComponent/UseEffectComponentExample";
// Import useMemo Hook Details
import useMemoInformation from "../Hooks/UseMemoComponent/information";
import UseMemoComponentExample from "../Hooks/UseMemoComponent/UseMemoComponentExample";
// Import useReducer Hook Details
import useReducerInformation from "../Hooks/UseReducerComponent/information";
import UseReducerComponentExample from "../Hooks/UseReducerComponent/UseReducerComponentExample";
// Import useCallback Hook Details
import useCallbackInformation from "../Hooks/UseCallbackComponent/information";
import UseCallbackComponentExample from "../Hooks/UseCallbackComponent/UseCallbackComponentExample";
// Import useRef Hook Details
import useRefInformation from "../Hooks/UseRefComponent/information";
import UseRefComponentExample from "../Hooks/UseRefComponent/UseRefComponentExample";
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
  {
    id: 5,
    title: "useMemo",
    info: useMemoInformation,
    example: UseMemoComponentExample,
    category: "hooks",
  },
  {
    id: 6,
    title: "useReducer",
    info: useReducerInformation,
    example: UseReducerComponentExample,
    category: "hooks",
  },
  {
    id: 7,
    title: "useCallback",
    info: useCallbackInformation,
    example: UseCallbackComponentExample,
    category: "hooks",
  },
  {
    id: 8,
    title: "useRef",
    info: useRefInformation,
    example: UseRefComponentExample,
    category: "hooks",
  },
  {
    id: 9,
    title: "useRef",
    info: useRefInformation,
    example: UseRefComponentExample,
    category: "hooks",
  },
];
