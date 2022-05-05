// import React from "react"; v17以降は必要ない
import React from "react";
import IngredientsList from "../ingredient/IngredientsList";
import Instructions from "../ingredient/Instructions";

function Recipe({name, ingredients, steps}) {
    return (
        <section id={name.toLowerCase().replace(/ /g, "-")}>
            <h1>{name}</h1>
            <IngredientsList list={ingredients}/>
            <Instructions title="Cooking Instructions" steps={steps}/>
        </section>
    );
}

export default Recipe;