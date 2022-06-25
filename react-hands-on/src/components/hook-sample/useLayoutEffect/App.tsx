import React, { useEffect, useLayoutEffect } from "react";

const App = () => {
  useEffect(() => console.log("useEffect"));
  useLayoutEffect(() => console.log("useLayoutEffect"));
  return <div>ready</div>;
};

export default App;
