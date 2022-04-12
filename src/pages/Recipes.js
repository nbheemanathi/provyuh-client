import React, { useState, useContext } from "react";
import RecipeInformation from "../components/recipes/RecipeInformation";
import RecipesCategories from "../components/recipes/RecipesCategories";
import RecipesCuisine from "../components/recipes/RecipesCuisine";
import RecipeSearch from "../components/recipes/RecipeSearch";
import UserLikedRecipes from "../components/recipes/UserLikedRecipes";
import { AuthContext } from "../context/auth";
import { Input, AutoComplete } from "antd";

export default function Recipes() {
  const { user } = useContext(AuthContext);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchText, setSearchText] = useState(null);
  return (
    <div>
      {!selectedRecipe ? (
        <div>
          <div className="mb-4">
            <h1 className="text-xl font-bold text-gray-800">Find the right recipe ✨</h1>
          </div>
          <div className="w-full lg:max-w-xl mb-5">
            <Input.Search
              size="large"
              placeholder="Search.."
              enterButton
              allowClear
              onSearch={(value) => setSearchText(value)}
            />
          </div>
          {searchText ? (
            <RecipeSearch query={searchText} user={user}/>
          ) : (
            <div className="grid grid-cols-12 gap-6">
              <RecipesCategories />
              <RecipesCuisine />
              <UserLikedRecipes
                user={user}
                selectedRecipeId={(recipeId) => setSelectedRecipe(recipeId)}
              />
            </div>
          )}
        </div>
      ) : (
        <RecipeInformation recipeId={selectedRecipe} onCancel={() => setSelectedRecipe(null)} />
      )}
    </div>
  );
}
