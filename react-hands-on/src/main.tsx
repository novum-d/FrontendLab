import Checkbox from "./components/checkbox/Checkbox";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

// import data from "../data/recipes.json";

import App from "./components/hook-sample/useEffectAndHook/App";

// render(
//   // Providerで囲むことで、一部のコンポーネントにデータを公開することができる
//   // この場合、Appに含まれる以下コンポーネントは、colorsを受け取ることができる
//   <ColorProvider>
//     <App />
//   </ColorProvider>,
//   document.getElementById("color")
// );

const rootElement = document.getElementById("checkbox") as Element;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
