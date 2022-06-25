import { useEffect } from "react";
import { useAnyKeyToRender } from "../hook";

const words = ["sick", "powder", "day"];

const App = () => {
  useAnyKeyToRender();
  useEffect(() => {
    console.log("fresh render");
  }, [words]);
  return <h1>Open the console</h1>;
};

export default App;
