import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { useQuery, useMutation } from "@apollo/client";
import { FETCH_RECIPES_QUERY, USER_RECIPE_MUTATION } from "../util/graphql";
import RecipeDetails from "./RecipeDetails";
import { Spin, Tooltip } from "antd";
import RecipeCard from "../components/recipes/RecipeCard";

export default function RecipesByType(props) {
  const recipeValue = props.match.params.value;
  const recipeType = props.match.params.type;
  const mealType = recipeValue.charAt(0).toUpperCase() + recipeValue.slice(1);
  const { user } = useContext(AuthContext);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [offset, setOffset] = useState(0)
  const { loading, data, fetchMore, refetch } = useQuery(FETCH_RECIPES_QUERY, {
    variables:
      recipeType === "type"
        ? {
            type: recipeValue.toLowerCase(),
            number: 12,
            offset: 0,
            addRecipeNutrition: true,
            user: user.id,
          }
        : {
            cuisine: recipeValue.toLowerCase(),
            number: 12,
            offset: 0,
            addRecipeNutrition: true,
            user: user.id,
          },

    // notifyOnNetworkStatusChange: true,
  });
  return (
    <div>
      {!selectedRecipe ? (
        <div>
          <div className="border-b-2 border-gray-200">
            <ul className="text-sm font-medium overflow-x-scroll flex flex-nowrap">
              <li className="pb-3 mr-6 last--mr-0">
                <Link
                  to="/recipes"
                  className="text-indigo-500 whitespace-nowrap outline-none"
                  href="#0"
                >
                  ← Back to Recipes
                </Link>
              </li>
              <li className="pb-3 mr-6 last--mr-0">
                <button className="text-indigo-500 font-medium whitespace-nowrap outline-none">
                  Show Filter
                </button>
              </li>
            </ul>
          </div>
          <div className="mt-2 overflow-y-scroll">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl mb-1 text-gray-500 font-bold">{mealType} Recipes</h2>
                {loading && <Spin />}
              </div>
              {!loading && (
                <div>
                  <div className="text-sm text-gray-500 italic mb-4">
                    {data?.getRandomRecipesOnLimit.totalResults} recipes
                  </div>
                  <div className="flex flex-col sm:flex-row md:flex-col h-full lg:flex-row overflow-y-scroll">
                    <div className="flex-1 h-auto">
                      <div className="grid  transition-all ease-in gap-4 grid-cols-12">
                        {data?.getRandomRecipesOnLimit.results.map((recipe) => (
                          <div
                            key={recipe.id}
                            className="hover:shadow-2xl  col-span-full sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-2 shadow-lg bg-white border border-gray-200 rounded-sm overflow-hidden"
                          >
                            <Tooltip key={recipe.id} title={recipe.title}>
                              <RecipeCard
                                recipe={recipe}
                                currentParentData={{offset,recipeType,recipeValue}}
                                onView={() => setSelectedRecipe(recipe)}
                              />
                            </Tooltip>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex flex-col sm:justify-between sm:items-center sm:flex-row">
                      <nav
                        className="mb-4 sm:order-1 sm:mb-0"
                        role="navigation"
                        aria-label="Navigation"
                      >
                        <ul className="flex justify-center">
                          <li className="ml-3 first:ml-0">
                            <button
                              onClick={() => {
                                fetchMore({
                                  variables: {
                                    offset: data.getRandomRecipesOnLimit.offset - 8,
                                  },
                                  updateQuery: (prev, { fetchMoreResult }) => {
                                    if (!fetchMoreResult) return prev;
                                    return fetchMoreResult;
                                  },
                                });
                              }}
                              className="px-3 py-2 bg-white border-gray-200 mv ao outline-none"
                              // disabled="disabled"
                            >
                              &lt;- Previous
                            </button>
                          </li>
                          <li className="ml-3 first:ml-0">
                            <button
                              onClick={() => {
                                setOffset(data.getRandomRecipesOnLimit.offset + 8)
                                fetchMore({
                                  variables: {
                                    offset: data.getRandomRecipesOnLimit.offset + 8,
                                  },
                                  updateQuery: (prev, { fetchMoreResult }) => {
                                    if (!fetchMoreResult) return prev;
                                    return fetchMoreResult;
                                  },
                                });
                              }}
                              className="px-3 py-2 bg-white border-gray-200 hover--border-gray-300 text-indigo-500 outline-none"
                            >
                              Next -&gt;
                            </button>
                          </li>
                        </ul>
                      </nav>
                      <div className="text-sm text-gray-500 text-center sm:text-left">
                        Showing
                        <span className="font-medium text-gray-600 px-1">
                          {data?.getRandomRecipesOnLimit.offset + 1}
                        </span>
                        to
                        <span className="font-medium text-gray-600 pl-1">
                          {data?.getRandomRecipesOnLimit.offset + 8}
                        </span>{" "}
                        of
                        <span className="font-medium text-gray-600 px-1">
                          {data?.getRandomRecipesOnLimit.totalResults}
                        </span>
                        results
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <RecipeDetails
          selectedRecipe={selectedRecipe}
          currentUser={user}
          OnBack={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}
