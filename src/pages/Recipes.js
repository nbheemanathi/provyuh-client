import React from "react";
import RecipesCategories from "../components/recipes/RecipesCategories";
import RecipesCuisine from "../components/recipes/RecipesCuisine";
export default function Recipes() {
  

  return (
    <div className="flex flex-wrap space-x-3">
      <RecipesCategories />
      <RecipesCuisine/>
    </div>
  );
}
