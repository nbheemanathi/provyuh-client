import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { useQuery, useMutation } from "@apollo/client";
import { FETCH_RECIPES_QUERY, USER_RECIPE_MUTATION } from "../util/graphql";
import RecipeDetails from "./RecipeDetails";

export default function RecipesByType(props) {
  const type = props.match.params.type;
  const mealType = type.charAt(0).toUpperCase() + type.slice(1);
  const { user } = useContext(AuthContext);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { loading, data, fetchMore } = useQuery(FETCH_RECIPES_QUERY, {
    variables: {
      type: type.toLowerCase(),
      number: 8,
      offset: 0,
      addRecipeNutrition: true,
    },
    notifyOnNetworkStatusChange: true,
  });

  const renderNutrients = (nutrients, type) => {
    const filteredNutrient = nutrients.find((s) => s.name === type);
    if (filteredNutrient) {
      return filteredNutrient.amount + " " + filteredNutrient.unit;
    }
    return "N/A";
  };
  const addDefaultSrc = (ev) => {
    ev.target.src = "https://unsplash.com/photos/Z20wtGu1OH4";
  };

  const [saveUserRecipe] = useMutation(USER_RECIPE_MUTATION, {
    update(proxy, result) {
      console.log(result);
    },
    onError(err) {
      console.log(err);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  return (
    <div className="container  px-4 lg:px-8 py-6 mx-auto ">
      {!selectedRecipe ? (
        <div>
          <div>
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
                    Show Filter
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 overflow-y-scroll">
            <div>
              <h2 className="text-xl mb-1 text-gray-500 font-bold">{mealType} Recipes</h2>
              {loading ? (
                <div class="container h-96 flex justify-center items-center">
                  <div
                    class="
                    animate-spin
                    rounded-full
                    h-32
                    w-32
                    border-t-2 border-b-2 border-purple-500
                  "
                  ></div>
                </div>
              ) : (
                <div>
                  <div className="text-sm text-gray-500 italic mb-4">
                    {data?.getRandomRecipesOnLimit.totalResults} recipes
                  </div>
                  <div className="flex flex-col sm:flex-row md:flex-col h-full lg:flex-row overflow-y-scroll">
                    <div className="flex-1 h-auto">
                      <div className="grid  transition-all ease-in gap-6 grid-cols-12">
                        {data?.getRandomRecipesOnLimit.results.map((recipe) => (
                          <div
                            key={recipe.id}
                            className="hover:shadow-2xl  col-span-full sm:col-span-6 xl:col-span-3 shadow-lg bg-white border border-gray-200 rounded-sm overflow-hidden"
                          >
                            <div className="flex flex-col h-full">
                              <div className="relative">
                                <img
                                  onError={addDefaultSrc}
                                  className="w-full max-w-full h-auto"
                                  src={recipe.image}
                                  alt=""
                                />
                                <button
                                  onClick={() =>
                                    saveUserRecipe({
                                      variables: {
                                        recipeId: parseInt(recipe.id),
                                        title: recipe.title,
                                        imageUrl: recipe.image,
                                      },
                                    })
                                  }
                                  className="outline-none mr-4 mt-4 absolute top-0 right-0"
                                >
                                  <div className="bg-white text-indigo-700 rounded-full bg-opacity-60">
                                    <span className="likeButton">Like</span>
                                    <svg className="fill-current w-8 h-8" viewBox="0 0 32 32">
                                      <path d="M22.682 11.318A4.485 4.485 0 0019.5 10a4.377 4.377 0 00-3.5 1.707A4.383 4.383 0 0012.5 10a4.5 4.5 0 00-3.182 7.682L16 24l6.682-6.318a4.5 4.5 0 000-6.364zm-1.4 4.933L16 21.247l-5.285-5A2.5 2.5 0 0112.5 12c1.437 0 2.312.681 3.5 2.625C17.187 12.681 18.062 12 19.5 12a2.5 2.5 0 011.785 4.251h-.003z"></path>
                                    </svg>
                                  </div>
                                </button>
                              </div>
                              <div className="flex flex-col flex-grow p-5">
                                <div className="flex-grow">
                                  <header className="mb-3">
                                    <h3 className="text-gray-800 font-semibold text-lg">
                                      {recipe.title}
                                    </h3>
                                  </header>
                                  <div className="flex flex-wrap justify-between items-center mb-4">
                                    <div className="flex items-center mr-1">
                                      <div className="flex content-center">
                                        <svg
                                          className="h-5 w-5 mr-3 flex-shrink-0"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div className="text-sm font-medium">
                                          {recipe.readyInMinutes} mins
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center mr-1">
                                      <div className="flex content-center">
                                        <svg
                                          className="h-5 w-5 mr-3 flex-shrink-0"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                        </svg>
                                        <div className="text-sm font-medium">
                                          Servings → {recipe.servings}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <ul className="text-sm mb-5 space-y-2">
                                    <li className="flex items-center text-gray-600">
                                      <svg
                                        className="h-6 w-6 mr-2 flex-shrink-0"
                                        stroke="currentColor"
                                        viewBox="15 0 100 125"
                                      >
                                        <g>
                                          <g>
                                            <path d="M49.6,89.4c-13.4,0-27.4-7.6-28.4-24.4c-0.8-13.6,8.1-32.3,16.6-40.6c0.3-0.3,0.8-0.4,1.2-0.1c0.4,0.2,0.6,0.7,0.4,1.2    c0,0.1-2.2,6.9,1.3,11.7C41.1,25,52.1,13.2,60,11.4c0.4-0.1,0.7,0,1,0.3c0.2,0.3,0.3,0.7,0.2,1c-2.7,7.7-1,15.3,5.3,23.1l0.5,0.6    c4.6,5.8,13.1,16.5,12,29.4C77.6,81.3,63.1,89.4,49.6,89.4z M36.8,28.4C30.1,36.4,22.4,52,23.2,64.8c1,16.7,14.8,22.6,26.4,22.6    c12.7,0,26.1-7.5,27.3-21.8c1-12.1-7.2-22.4-11.6-28L64.8,37c-6.2-7.8-8.2-15.4-6.2-23.2c-7.5,3.1-17,14.8-15.9,25.8    c0,0.4-0.2,0.8-0.5,1c-0.4,0.2-0.8,0.1-1.1-0.1C36.8,37,36.5,31.8,36.8,28.4z" />
                                          </g>
                                        </g>
                                      </svg>
                                      <div>
                                        Calories →{" "}
                                        {renderNutrients(recipe.nutrition.nutrients, "Calories")}
                                      </div>
                                    </li>
                                    <li className="flex items-center text-gray-600">
                                      <svg
                                        className="h-6 w-6 mr-2 flex-shrink-0"
                                        stroke="currentColor"
                                        viewBox="15 0 80 100"
                                      >
                                        <path d="M50.49,58.56h0L40.33,50.42a.93.93,0,0,0-.5-.21l-13.89-1.8h0a1.23,1.23,0,0,0-.38,0,1,1,0,0,0-.68.61l-6,15.48a1,1,0,0,0,.29,1.14l9.69,8,.05,0,.1,0a1,1,0,0,0,.28.11l.07,0,14.38,2h.13a1,1,0,0,0,.94-.64l6-15.49a.93.93,0,0,0-.32-1.13Zm-4.07-.71L35.91,56.41l-6.77-5.57L39.3,52.15Zm-20.17-6.8,8,6.63L29.1,71.2,21,64.57Zm17,22.67L30.92,72l.12-.3,5.1-13.27,12.35,1.69ZM80,50.43a1,1,0,0,0-.45-.77,1.54,1.54,0,0,0-.34-.12v0L67.61,47.06a.93.93,0,0,0-.55,0L54.88,51.52h0a1.1,1.1,0,0,0-.32.17,1,1,0,0,0-.34.83L55.39,68a1,1,0,0,0,.77.9l11.12,2.54.22,0a1,1,0,0,0,.34-.06l12.64-4.49a1,1,0,0,0,.67-1ZM67.47,49.08l7.85,1.66-9,3.21-7.53-1.71ZM57.33,67.14l-1-13.41L65.4,55.8l1,13.41Zm11.07,2L68.32,68,67.4,55.68l10.69-3.8,1,13.43ZM36.66,42.19,46,46.33h0a1,1,0,0,0,.39.08h.16l11.93-1.94a1,1,0,0,0,.83-.86l1.75-14.15a1,1,0,0,0-.3-.84.71.71,0,0,0-.3-.18v0l-9.76-4.15a1.07,1.07,0,0,0-.56-.06l-11.5,1.95v0a1,1,0,0,0-.33.1,1,1,0,0,0-.5.74L36.07,41.16A1,1,0,0,0,36.66,42.19Zm20.77.42-9.87,1.6,1.49-12.07,9.87-1.61ZM50.2,26.22l6.31,2.68-8.23,1.34-6-2.67ZM39.64,28.6l7.43,3.28L45.57,44l-7.42-3.28Z" />
                                      </svg>
                                      <div>
                                        Sugar →{" "}
                                        {renderNutrients(recipe.nutrition.nutrients, "Sugar")}
                                      </div>
                                    </li>
                                    <li className="flex items-center text-gray-600">
                                      <svg
                                        className="h-6 w-6 mr-2 flex-shrink-0"
                                        stroke="currentColor"
                                        viewBox="0 0 60 70"
                                      >
                                        <path d="M7.89,50.91c0,2.26,1.84,4.09,4.09,4.09h36.04c2.26,0,4.09-1.83,4.09-4.09V21.96c0-2.26-1.84-4.09-4.09-4.09h-2.74v-3.63  h1.69c1.54,0,2.78-1.25,2.78-2.78V7.78C49.75,6.25,48.5,5,46.96,5H13.04c-1.54,0-2.79,1.25-2.79,2.78v3.67  c0,1.54,1.25,2.78,2.79,2.78h1.69v3.63h-2.74c-2.26,0-4.09,1.84-4.09,4.09V50.91z M12.25,11.45V7.78C12.25,7.35,12.6,7,13.04,7  h33.93c0.43,0,0.78,0.35,0.78,0.78v3.67c0,0.43-0.35,0.78-0.78,0.78h-2.69H15.73h-2.69C12.6,12.24,12.25,11.89,12.25,11.45z   M16.73,14.24h26.55v3.63H16.73V14.24z M9.89,21.96c0-1.15,0.94-2.09,2.09-2.09h3.74h28.55h3.74c1.15,0,2.09,0.94,2.09,2.09v28.95  c0,1.15-0.94,2.09-2.09,2.09H11.98c-1.15,0-2.09-0.94-2.09-2.09V21.96z" />
                                        <path d="M25.21,37.95h2.61l-1.34,7c-0.09,0.47,0.17,0.95,0.62,1.12c0.12,0.04,0.24,0.07,0.36,0.07c0.34,0,0.67-0.17,0.85-0.48  l7.32-12.03c0.19-0.31,0.19-0.69,0.02-1.01c-0.18-0.31-0.51-0.51-0.87-0.51H32.6l0.94-4.16c0.07-0.3,0-0.61-0.19-0.84  s-0.48-0.38-0.78-0.38h-4.79c-0.45,0-0.84,0.3-0.96,0.73l-2.56,9.23c-0.08,0.3-0.02,0.62,0.17,0.87  C24.61,37.81,24.9,37.95,25.21,37.95z M28.54,28.73h2.78l-0.94,4.16c-0.07,0.3,0,0.61,0.19,0.84s0.48,0.38,0.78,0.38h1.66  l-3.52,5.79l0.53-2.76c0.06-0.29-0.02-0.59-0.21-0.83c-0.19-0.23-0.47-0.36-0.77-0.36h-2.5L28.54,28.73z" />
                                      </svg>
                                      <div>
                                        Protein →{" "}
                                        {renderNutrients(recipe.nutrition.nutrients, "Protein")}
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <div>
                                  <button
                                    onClick={() => {
                                      setSelectedRecipe(recipe);
                                    }}
                                    className="py-1 px-2 w-full bg-indigo-500 text-white rounded-md"
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
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
                                // CallGetRecipes()
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
