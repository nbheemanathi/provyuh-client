import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_RECIPE_INFO } from "../../util/graphql";
import { IoTimerOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { MdOutlineNoFood } from "react-icons/md";
import { Button } from "antd";
import { Link, useHistory } from "react-router-dom";

export default function RecipeInformation(props) {
  const history = useHistory();
  const recipeId = props.match.params.id;
  const [showNutrients, setShowNutrients] = useState(false);
  const { loading, data } = useQuery(FETCH_RECIPE_INFO, {
    variables: {
      id: parseInt(recipeId),
    },
  });
  return (
    <div className="">
      <div className="border-b-2 border-gray-200 pb-1">
        <button
          onClick={() => history.goBack()}
          className="text-indigo-500 whitespace-nowrap outline-none text-sm font-medium"
        >
          ← Go Back
        </button>
      </div>
      {!loading && (
        <div className="bg-white rounded shadow-lg h-full px-6 py-2 mt-3 ">
          <div className="flex justify-between">
            {/* <div className="w-2/5 pr-8">
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
            </div> */}
            <div>
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
          </div>
          <div className="flex mt-8">
            <div className="w-2/5 pr-8 hidden md:block">
              <div className="bg-gray-300 rounded-lg p-6">
                <div className="w-full">
                  <img src={data.getRecipeInformation.image} />
                </div>
                <div className="py-2 border-b-2">
                  <h2 className="font-bold text-xl mb-2 text-gray-800">Ingredients</h2>
                  {data.getRecipeInformation.nutrition?.ingredients.map((ingredient) => (
                    <div
                      key={ingredient.id}
                      className="flex space-x-5 justify-between capitalize mt-2"
                    >
                      <p className="text-gray-500 text-base font-bold">{ingredient.name}</p>
                      <p className="text-gray-700 text-base font-bold">
                        {ingredient.amount}
                        <span className="text-xs text-gray-600 ml-1">
                          {ingredient.unit === "c" ? "cup" : ingredient.unit}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  {!showNutrients ? (
                    <Button shape="round" type="primary" onClick={() => setShowNutrients(true)}>
                      Show Nutrients ..
                    </Button>
                  ) : (
                    <div>
                      <h2 className="font-bold text-xl mb-2 text-gray-800">Nutrients</h2>
                      {data.getRecipeInformation.nutrition?.nutrients.map((nutrient) => (
                        <div
                          key={nutrient.id}
                          className="flex justify-between text-lg capitalize mt-2"
                        >
                          <p className="text-gray-500 text-base font-bold">{nutrient.name}</p>
                          <p className="text-gray-700 text-base font-bold">
                            {nutrient.amount}
                            <span className="text-xs text-gray-600 ml-1">{nutrient.unit}</span>
                          </p>
                        </div>
                      ))}
                      <Button shape="round" type="primary" onClick={() => setShowNutrients(false)}>
                        Hide Nutrients ..
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full md:w-3/5 mr-4">
              <p
                className="text-sm leading-7"
                dangerouslySetInnerHTML={{ __html: data.getRecipeInformation.summary }}
              ></p>
              <div className="block md:hidden mt-3">
                <div className="bg-gray-300 rounded-lg p-6">
                  <div className="w-full">
                    <img src={data.getRecipeInformation.image} />
                  </div>
                  <div className="py-2 border-b-2">
                    <h2 className="font-bold text-xl mb-2 text-gray-800">Ingredients</h2>
                    {data.getRecipeInformation.nutrition?.ingredients.map((ingredient) => (
                      <div
                        key={ingredient.id}
                        className="flex space-x-5 justify-between capitalize mt-2"
                      >
                        <p className="text-gray-500 text-base font-bold">{ingredient.name}</p>
                        <p className="text-gray-700 text-base font-bold">
                          {ingredient.amount}
                          <span className="text-xs text-gray-600 ml-1">
                            {ingredient.unit === "c" ? "cup" : ingredient.unit}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4">
                    {!showNutrients ? (
                      <Button shape="round" type="primary" onClick={() => setShowNutrients(true)}>
                        Show Nutrients ..
                      </Button>
                    ) : (
                      <div>
                        <h2 className="font-bold text-xl mb-2 text-gray-800">Nutrients</h2>
                        {data.getRecipeInformation.nutrition?.nutrients.map((nutrient) => (
                          <div
                            key={nutrient.id}
                            className="flex justify-between text-lg capitalize mt-2"
                          >
                            <p className="text-gray-500 text-base font-bold">{nutrient.name}</p>
                            <p className="text-gray-700 text-base font-bold">
                              {nutrient.amount}
                              <span className="text-xs text-gray-600 ml-1">{nutrient.unit}</span>
                            </p>
                          </div>
                        ))}
                        <Button
                          shape="round"
                          type="primary"
                          onClick={() => setShowNutrients(false)}
                        >
                          Hide Nutrients ..
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <h2 className="font-bold text-xl mb-2 text-gray-800">Instructions</h2>
                <ul className="list-decimal list-outside mb-6">
                  {data.getRecipeInformation.analyzedInstructions.length > 0 &&
                    data.getRecipeInformation.analyzedInstructions[0].steps.map((step) => (
                      // <li key={step.number}>{step.step}</li>
                      <div key={step.number}>
                        <h5 className="mt-4 mb-2 text-lg font-bold text-gray-600">
                          Step {step.number}
                        </h5>
                        <p
                          className="text-base"
                          dangerouslySetInnerHTML={{ __html: step.step }}
                        ></p>{" "}
                      </div>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
