import Checkbox from "./components/checkbox/Checkbox";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

// import data from "../data/recipes.json";
// import Menu from "./components/recipe/Menu";
// import StarRating from "./components/starRating/StarRating";
// import App from "./components/starRating/App";
// import AddColorForm from "./components/form/AddColorFrom";
// import App from "./components/color/App";
// import ColorProvider from "./components/color/ColorProvider";

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
    <Checkbox />
  </StrictMode>
);
