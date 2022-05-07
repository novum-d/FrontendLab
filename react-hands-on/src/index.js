import {render} from "react-dom";
import React from "react";
import data from "../data/recipes.json";
import Menu from "./components/recipe/Menu";
import StarRating from "./components/starRating/StarRating";
import App from "./components/starRating/App";

// render(<Menu recipes={data}/>, document.getElementById("root"));
// render(<StarRating/>, document.getElementById("star-rating"));
render(<App/>, document.getElementById("star-rating"));
