import {render} from "react-dom";
import React from "react";
import data from "../data/recipes.json";
import Menu from "./components/Menu";

render(<Menu recipes={data}/>, document.getElementById("root"));