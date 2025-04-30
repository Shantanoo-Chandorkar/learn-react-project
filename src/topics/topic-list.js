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
// Import useContext Hook Details
import useContextInformation from "../Hooks/UseContextComponent/information";
import UseContextComponentExample from "../Hooks/UseContextComponent/UseContextComponentExample";
// Import State Details
import StateInformation from "../RelatedTopics/State/information";
// Import Side Effects Details
import SideEffectsInformation from "../RelatedTopics/SideEffects/information";
// Import React Router Details
import ReactRouterInformation from "../RelatedTopics/ReactRouter/information";
// Import React Router Best Practices
import ReactRouterBestPracticesInformation from "../RelatedTopics/ReactRouterBestPractices/information";
import VirtualDomInformation from "../RelatedTopics/VirtualDom/information";
import ReactClassVsFunctionInformation from "../RelatedTopics/ReactClassVsFunction/information";
import ReactComponentLifeCycleInformation from "../RelatedTopics/ReactComponentLifeCycle/information";

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
    title: "useContext",
    info: useContextInformation,
    example: UseContextComponentExample,
    category: "hooks",
  },
  {
    id: 10,
    title: "React Router",
    info: ReactRouterInformation,
    category: "related-topics",
  },
  {
    id: 11,
    title: "React Virtual DOM",
    info: VirtualDomInformation,
    category: "related-topics",
  },
  {
    id: 12,
    title: "React Class Vs Function",
    info: ReactClassVsFunctionInformation,
    category: "related-topics",
  },
  {
    id: 13,
    title: "React Component Life Cycle",
    info: ReactComponentLifeCycleInformation,
    category: "related-topics",
  },
  {
    id: 14,
    title: "React Router Best Practices",
    info: ReactRouterBestPracticesInformation,
    category: "related-topics",
  },

];
