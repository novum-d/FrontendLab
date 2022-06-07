import React from "react";
import { StarRating } from "./StarRating";

const App = () => {
  return (
    <StarRating
      style={{ backgroundColor: "lightblue" }}
      onDoubleClick={(e: React.MouseEvent) => alert("double click")}
    />
  );
};

export default App;
