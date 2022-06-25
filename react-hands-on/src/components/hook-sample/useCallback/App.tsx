import { useCallback, useEffect } from "react";
import { useAnyKeyToRender } from "../hook";

const App = () => {
  useAnyKeyToRender();

  // const fn = () => {
  //   console.log("hello world");
  // };
  const fn = useCallback(() => {
    console.log("hello world");
  }, []);
  useEffect(() => {
    console.log("fresh render");
    fn();
  }, [fn]);
  return <h1>useCallBack is memorization function.</h1>;
};

export default App;
