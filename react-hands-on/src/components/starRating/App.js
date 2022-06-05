import React from "react";
import StarRating from "./StarRating";

export default App;

function App() {
  return (
    <StarRating
      style={{ backgroundColor: "lightblue" }}
      onDoubleClick={(e) => e.alert("double click")}
    />
  );
}
