import React, { useState } from "react";
import { FETCH_RECIPES_QUERY } from "../../util/graphql";
import { useQuery } from "@apollo/client";
import { Spin, Tooltip } from "antd";
import RecipeCard from "../../components/recipes/RecipeCard";

export default function RecipeSearch(props) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const queryText = props.query;
  const user = props.user;
  const { loading, data, fetchMore, refetch } = useQuery(FETCH_RECIPES_QUERY, {
    variables: {
      query: queryText,
      number: 12,
      offset: 0,
      addRecipeNutrition: true,
      user: user.id,
    },

    // notifyOnNetworkStatusChange: true,
    fetchPolicy:"no-cache"
  });
  return (
    <div>
      <div className="mt-2 overflow-y-scroll">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl mb-1 text-gray-500 font-bold">{queryText} Recipes</h2>
          {loading && <Spin />}
        </div>
        {!loading && (
          <div className="flex">
            <div className="flex-1">
              <div className="text-sm text-gray-500 italic mb-4">
                {data?.getRandomRecipesOnLimit.totalResults} recipes
              </div>
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row overflow-y-scroll">
                <div className="flex-1 h-auto">
                  <div
                    className={`grid  transition-all ease-in gap-4 ${
                      selectedRecipe ? "grid-cols-8" : "grid-cols-12"
                    } `}
                  >
                    {data?.getRandomRecipesOnLimit.results.map((recipe) => (
                      <div
                        key={recipe.id}
                        className="hover:shadow-2xl  col-span-full sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-2 shadow-lg bg-white border border-gray-200 rounded-sm overflow-hidden"
                      >
                        <Tooltip key={recipe.id} title={recipe.title}>
                          <RecipeCard recipe={recipe} onView={() => setSelectedRecipe(recipe)} />
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
            {selectedRecipe && (
              <div className="w-1/3 ml-2 mt-9">
                <div className="bg-white w-full shadow-2xl p-4 rounded-md  h-screen overflow-auto">
                  <div className="flex justify-between mb-3">
                    <h1 class="text-2xl  text-gray-800 font-bold mb-2">{selectedRecipe.title}</h1>

                    <button
                      onClick={() => setSelectedRecipe(null)}
                      className="text-indigo-500 font-sm whitespace-nowrap outline-none"
                    >
                    ← Close
                    </button>
                  </div>

                  <p
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: selectedRecipe.summary }}
                  ></p>
                  <figure class="my-6 flex justify-center">
                    <img
                      class="w-auto rounded-sm h-auto object-cover"
                      src={selectedRecipe.image}
                      alt="Product"
                    />
                  </figure>
                  <div>
                    <h2 className="font-bold text-xl mb-2 text-gray-800">Ingredients</h2>
                    <ul className="list-disc list-inside mb-6">
                      {selectedRecipe.nutrition.ingredients.map((ingredient) => (
                        <li key={ingredient.id}>
                          {ingredient.name} - {ingredient.amount}{" "}
                          {ingredient.unit === "c" ? "cup" : ingredient.unit}
                        </li>
                      ))}
                    </ul>
                    {selectedRecipe.analyzedInstructions.length > 0 && (
                      <div>
                        <h2 className="font-bold text-xl mb-2 text-gray-800">Instructions</h2>
                        <ul className="list-decimal list-outside ml-3 mb-6">
                          {selectedRecipe.analyzedInstructions[0].steps?.map((step) => (
                            <li key={step.number}>{step.step}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
