import React, { useEffect, useMemo } from "react";
import { useAnyKeyToRender } from "../hook";

const App = () => {
  return <WordCount>You are not going to believe this but...</WordCount>;
};

const WordCount = ({ children = "" }) => {
  // const words = children.split("");
  const words = useMemo(() => children.split(""), [children]);
  useAnyKeyToRender();
  useEffect(() => {
    console.log("fresh render");
  }, [words]);
  return (
    <>
      <p>{children}</p>
      <p>
        <strong>{words.length} - words</strong>
      </p>
    </>
  );
};

export default App;
