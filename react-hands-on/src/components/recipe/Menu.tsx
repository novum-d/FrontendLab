import React from "react";
import Recipe, { RecipeProps } from "./Recipe";

export const Menu = ({ recipes }: { recipes: RecipeProps[] }) => {
  return (
    <article>
      <header>
        <h1>Delicious Recipes</h1>
      </header>
      <div className="recipes">
        {recipes.map((recipe: RecipeProps, i: number) => (
          <Recipe key={i} {...recipe} />
        ))}
      </div>
    </article>
  );
};
