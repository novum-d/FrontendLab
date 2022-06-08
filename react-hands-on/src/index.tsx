import { render } from "react-dom";
import App from "./components/color/App";
import ColorProvider from "./components/color/ColorProvider";

// import data from "../data/recipes.json";
// import Menu from "./components/recipe/Menu";
// import StarRating from "./components/starRating/StarRating";
// import App from "./components/starRating/App";
// import AddColorForm from "./components/form/AddColorFrom";

// render(<Menu recipes={data}/>, document.getElementById("root"));
// render(<StarRating/>, document.getElementById("star-rating"));
// render(<App/>, document.getElementById("star-rating"));
// render(<AddColorForm />, document.getElementById("form"));
// render(<App />, document.getElementById("color"));

render(
  // Providerで囲むことで、一部のコンポーネントにデータを公開することができる
  // この場合、Appに含まれる以下コンポーネントは、colorsを受け取ることができる
  <ColorProvider>
    <App />
  </ColorProvider>,
  document.getElementById("color")
);
