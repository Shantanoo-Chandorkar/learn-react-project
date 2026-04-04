import { lazy } from 'react';

const ComponentRegistry = {
  UseStateExample: lazy(() => import('../../Hooks/UseStateComponent/UseStateComponentExample')),
  UseEffectExample: lazy(() => import('../../Hooks/UseEffectComponent/UseEffectComponentExample')),
  UseContextExample: lazy(
    () => import('../../Hooks/UseContextComponent/UseContextComponentExample'),
  ),
  UseRefExample: lazy(() => import('../../Hooks/UseRefComponent/UseRefComponentExample')),
  UseMemoExample: lazy(() => import('../../Hooks/UseMemoComponent/UseMemoComponentExample')),
  UseCallbackExample: lazy(
    () => import('../../Hooks/UseCallbackComponent/UseCallbackComponentExample'),
  ),
  UseReducerExample: lazy(
    () => import('../../Hooks/UseReducerComponent/UseReducerComponentExample'),
  ),
};

export default ComponentRegistry;
