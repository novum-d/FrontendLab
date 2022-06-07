import React from "react";

export type IngredientProps = {
  amount: number;
  measurement: number;
  name: string;
};

const Ingredient = ({ amount, measurement, name }: IngredientProps) => {
  return (
    <li>
      {amount} {measurement} {name}
    </li>
  );
};

export default Ingredient;
