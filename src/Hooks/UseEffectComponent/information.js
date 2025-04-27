const useEffectInformation = [
  `The useEffect hook is used to control the Side Effects that happen in the React application. Basically, it is used when you want to trigger something, when some piece of state changes.`,
  `No matter how you provide the dependency array or how you provide it, the useEffect hook will run at least once. This happens at the time when the component mounts.`,
  `Syntax: useEffect(() => {
      // The code that we want to run.

      // The optional return function.
    }, []); // The dependency array.`,
  `So, there are certain type of dependency array.
  1. Empty: If the dependency array is empty, then the useEffect hook will only run at mounting.
  2. Given a value: This is the best practice, to pass the value that is prone to changes, will be passed in the dependency array.
  3. When array itself is not provided: The useEffect hook will run on every render. It is similar to the componentDidUpdate in the class-based React.`,
]

export default useEffectInformation;