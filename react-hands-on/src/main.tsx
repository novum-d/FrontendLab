import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

// import data from "../data/recipes.json";

import App from "./components/suspense/app/App";
import { BrowserRouter as Router } from "react-router-dom";

// render(
//   // Providerで囲むことで、一部のコンポーネントにデータを公開することができる
//   // この場合、Appに含まれる以下コンポーネントは、colorsを受け取ることができる
//   <ColorProvider>
//     <App />
//   </ColorProvider>,
//   document.getElementById("color")
// );

const root = createRoot(document.getElementById("root") as Element);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
