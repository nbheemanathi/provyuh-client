import React, { useState, useContext } from "react";
import RecipeInformation from "../components/recipes/RecipeInformation";
import RecipesCategories from "../components/recipes/RecipesCategories";
import RecipesCuisine from "../components/recipes/RecipesCuisine";
import UserLikedRecipes from "../components/recipes/UserLikedRecipes";
import { AuthContext } from "../context/auth";

export default function Recipes() {
  const { user } = useContext(AuthContext);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <div>
      {!selectedRecipe ? (
            <div className="grid grid-cols-12 gap-6">
            <RecipesCategories />
          <RecipesCuisine />
           <UserLikedRecipes
            user={user}
            selectedRecipeId={(recipeId) => setSelectedRecipe(recipeId)}
          /> 
        </div>
      ) : (
        <RecipeInformation recipeId={selectedRecipe} onCancel={() => setSelectedRecipe(null) }/>
      )}
    </div>
  );
}
