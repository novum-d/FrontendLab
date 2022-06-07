import React from "react";
import Ingredient, { IngredientProps } from "./Ingredient";

const IngredientsList = ({ list }: { list: IngredientProps[] }) => {
  return (
    <ul className="ingredients">
      {list.map((ingredient: IngredientProps, i: number) => (
        <Ingredient key={i} {...ingredient} />
      ))}
    </ul>
  );
};
export default IngredientsList;
