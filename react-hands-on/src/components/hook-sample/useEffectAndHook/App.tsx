import React, { createElement, useEffect, useState } from "react";

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}

function useAnyKeyToRender() {
  const forceUpdate = useForceUpdate();
  // keydownイベントハンドラにforceUpdateを指定
  useEffect(() => {
    window.addEventListener("keydown", forceUpdate); //
    return () => window.removeEventListener("keydown", forceUpdate);
  }, []);
}
const words = ["sick", "powder", "day"];

const App = () => {
  useAnyKeyToRender();
  useEffect(() => {
    console.log("fresh render");
  }, [words]);
  return <h1>Open the console</h1>;
};

export default App;
