import React,{useContext} from "react";
import RecipesCategories from "../components/recipes/RecipesCategories";
import RecipesCuisine from "../components/recipes/RecipesCuisine";
import UserLikedRecipes from "../components/recipes/UserLikedRecipes";
import { AuthContext } from "../context/auth";

export default function Recipes() {
  const { user } = useContext(AuthContext);
  

  return (
    <div className="flex flex-wrap space-x-3">
      <RecipesCategories />
      <RecipesCuisine/>
      <UserLikedRecipes user={user}/>
    </div>
  );
}
