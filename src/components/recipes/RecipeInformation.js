import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_RECIPE_INFO } from "../../util/graphql";
import { IoTimerOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { MdOutlineNoFood } from "react-icons/md";

export default function RecipeInformation(props) {
  const recipeId = props.recipeId;
  const [recipeInfo, setRecipeInfo] = useState(null);
  const { loading, data } = useQuery(FETCH_RECIPE_INFO, {
    variables: {
      id: recipeId,
    },
  });
  if (!loading) {
    console.log(data);
  }
  return (
    <div className="">
      <div className="border-b-2 border-gray-200 pb-1">
        <button
          onClick={() => props.onCancel()}
          className="text-indigo-500 whitespace-nowrap outline-none text-sm font-medium"
        >
          ← Back to Recipes
        </button>
      </div>
      {!loading && (
        <div className="bg-white rounded shadow-lg h-full px-6 py-2 mt-3 ">
          <div className="flex justify-between">
            <div className="w-1/2 overflow-hidden">
              <h1 class="text-3xl  text-gray-600 font-bold my-2">
                {data.getRecipeInformation.title}
              </h1>
              <div className="flex flex-wrap mt-2 ">
                <div className="flex pr-4 space-x-1 justify-between items-center text-base border-gray-300 border-r-2">
                  <IoTimerOutline style={{ fontSize: "18" }} />{" "}
                  <p>{data.getRecipeInformation.readyInMinutes} </p>
                </div>
                <div className="flex px-4 space-x-1 justify-between items-center text-base border-gray-300 border-r-2">
                  <BsPerson style={{ fontSize: "18" }} />{" "}
                  <p>{data.getRecipeInformation.servings}</p>
                </div>
                <div className="flex px-4 space-x-1 justify-between items-center text-base ">
                  <MdOutlineNoFood style={{ fontSize: "18" }} />{" "}
                  <p>{data.getRecipeInformation.vegetarian ? "Vegetarian" : "Non-vegetarian"}</p>
                </div>
              </div>
            </div>
            <div className="w-2/5">
              <ul className="flex flex-wrap my-2 ">
                {data.getRecipeInformation.dishTypes.map((dishType, index) => (
                  <li
                    key={index}
                    class="m-1 border-gray-300 border-r-2 last:border-r-0 text-gray-400"
                  >
                    <div class="inline-flex items-center uppercase justify-center text-sm font-medium   py-1 px-2">
                      {dishType}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex mt-8">
            <div className="w-3/5 mr-4">
              <p
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: data.getRecipeInformation.summary }}
              ></p>
              <div className="mt-3">
                <h2 className="font-bold text-xl mb-2 text-gray-800">Instructions</h2>
                <ul className="list-decimal list-outside mb-6">
                  {data.getRecipeInformation.analyzedInstructions[0].steps.map((step) => (
                    // <li key={step.number}>{step.step}</li>
                    <div key={step.number}>
                      <h5 className="mt-4 mb-2 text-lg font-bold text-gray-600">
                        Step {step.number}
                      </h5>
                      <p className="text-base" dangerouslySetInnerHTML={{ __html: step.step }}></p>{" "}
                    </div>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-2/5 pl-8">
              <div className="bg-gray-300 rounded-lg p-6">
                <div className="w-full">
                  <img src={data.getRecipeInformation.image} />
                </div>
                <div className="py-2 border-b-2">
                  <h2 className="font-bold text-xl mb-2 text-gray-800">Ingredients</h2>
                  <ul className="list-disc list-inside mb-6">
                    {data.getRecipeInformation.nutrition.ingredients.map((ingredient) => (
                      <div key={ingredient.id} className="flex justify-between text-lg capitalize mx-1 mt-2">
                        <p>{ingredient.name}</p>
                        <p>
                          {ingredient.amount} {ingredient.unit === "c" ? "cup" : ingredient.unit}
                        </p>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
