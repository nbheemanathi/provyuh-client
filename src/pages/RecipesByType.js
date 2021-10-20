import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { useQuery } from "@apollo/client";
import { FETCH_RECIPES_QUERY } from "../util/graphql";

export default function RecipesByType(props) {
  const type = props.match.params.type;
  const mealType = type.charAt(0).toUpperCase() + type.slice(1);
  const { user } = useContext(AuthContext);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { loading, data } = useQuery(FETCH_RECIPES_QUERY, {
    variables: {
      tags: [type.toLowerCase()],
    },
  });
  const addDefaultSrc = (ev) => {
    ev.target.src = "https://unsplash.com/photos/Z20wtGu1OH4";
  };
  console.log(data);
  return (
    <div className="container  px-4  lg:px-8 py-6 sm:mx-auto ">
      <div className="mb-5">
        <h1 className="text-3xl font-bold text-gray-800 tracking-wide">{mealType}</h1>
      </div>
      <div className="max-w-xl mb-5">
        <form className="relative">
          <input
            id="search-recipes"
            className="pl-9 py-3 w-full rounded focus:ring-1 ring-indigo-300 shadow"
            placeholder="Search .."
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute top-0 left-0 bottom-0 right-auto outline-none text-gray-400"
          >
            <svg
              className="flex-shrink-0 h-4 w-4 ml-3 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>
      <div className="border-b-2 mb-4 border-gray-200">
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
              View All
            </button>
          </li>
        </ul>
      </div>
      <div className="mt-8">
        <h2 className="text-xl mb-5 text-gray-500 font-bold">Recipes</h2>
        {loading ? (
          <h1>Loading ... </h1>
        ) : (
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row">
            <div className="flex-1">
              <div
                className={`grid  transition-all ease-in gap-6 ${
                  selectedRecipe ? "grid-cols-6" : "grid-cols-12"
                }`}
              >
                {data?.getRandomRecipes.map((recipe) => (
                  <div
                    onClick={() => setSelectedRecipe(recipe)}
                    key={recipe.id}
                    className="cursor-pointer hover:ring-2 ring-indigo-400 transform transition ease-in hover:shadow-2xl  col-span-full sm:col-span-4 xl:col-span-3 shadow-lg bg-white border border-gray-200 rounded-sm overflow-hidden"
                  >
                    <div className="flex flex-col h-full">
                      <img
                        onError={addDefaultSrc}
                        className="w-full max-w-full h-auto"
                        src={recipe.image}
                        alt=""
                      />
                      <div className="flex flex-col flex-grow p-5">
                        <div className="flex-grow">
                          <header className="mb-3">
                            <h3 className="text-gray-800 font-semibold text-lg">{recipe.title}</h3>
                          </header>
                          <div className="flex flex-wrap justify-between items-center mb-4">
                            <div className="flex items-center mr-2">
                              <div className="flex content-center">
                                <div className="text-sm text-gray-800 font-medium mr-1">
                                  Health Score:
                                </div>
                                <div className="text-sm font-medium">{recipe.healthScore}</div>
                              </div>
                            </div>
                            <div>
                              {recipe.vegan ? (
                                <div className="inline-flex text-indigo-500 text-sm rounded-full bg-green-300 px-2 py-1 text-center font-medium">
                                  Vegan
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <ul className="text-sm mb-5 space-y-2">
                            <li className="flex items-center text-gray-600">
                              <svg
                                className="h-5 w-5 mr-3 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <div>{recipe.readyInMinutes} mins</div>
                            </li>
                            <li className="flex items-center text-gray-600">
                              <svg
                                className="h-5 w-5 mr-3 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                              </svg>
                              <div>Servings → {recipe.servings}</div>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <button className="py-1 px-2 w-full bg-indigo-500 text-white rounded-md">
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {selectedRecipe ? (
              <div className="flex-1 border-l ml-5  border-gray-200">
                <div className="ml-5 bg-white w-full h-auto shadow-2xl p-8">
                  <div className="mb-3">
                    <button
                      onClick={() => setSelectedRecipe(null)}
                      className="text-indigo-500 font-sm whitespace-nowrap outline-none"
                    >
                        ← Close
                    </button>
                  </div>
                  <header class="mb-4">
                    <h1 class="text-2xl  text-gray-800 font-bold mb-2">{selectedRecipe.title}</h1>
                    <p
                      className="text-sm"
                      dangerouslySetInnerHTML={{ __html: selectedRecipe.summary }}
                    ></p>
                  </header>
                  <div className="mb-6">
                    <ul className="flex flex-wrap -m-1 ">
                      {selectedRecipe.dishTypes.map((dishType,index) => (
                        <li key={index} class="m-1">
                        <div
                          class="inline-flex items-center justify-center text-sm font-medium rounded-full hw hx border py-1 px-2 text-gray-400 bg-gray-200 shadow"
                        >
                          {dishType}
                        </div>
                      </li>
                      ))}
                      
                    </ul>
                  </div>

                  <div className="sm:flex justify-between items-center mb-6">
                    <div className="flex items-center mr-4">
                      <Link
                        class="block text-sm font-semibold whitespace-normal text-gray-500"
                        to="/"
                      >
                        {selectedRecipe.creditsText}
                      </Link>
                    </div>
                  </div>
                  <figure class="mb-6">
                    <img
                      class="w-full rounded-sm"
                      src={selectedRecipe.image}
                      width="640"
                      height="360"
                      alt="Product"
                    />
                  </figure>
                  <div>
                    <h2 className="font-bold text-xl mb-2 text-gray-800">Ingredients</h2>
                    <ul className="list-disc list-inside mb-6">
                      {selectedRecipe.extendedIngredients.map((ingredient) => (
                        <li key={ingredient.id}>
                          {ingredient.name} - {ingredient.amount}{" "}
                          {ingredient.unit === "c" ? "cup" : ingredient.unit}
                        </li>
                      ))}
                    </ul>
                    <h2 className="font-bold text-xl mb-2 text-gray-800">Instructions</h2>
                    <p dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }}></p>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
}
