import React from "react";
import { Link } from "react-router-dom";

export default function RecipeDetails(props) {
  const selectedRecipe = props.selectedRecipe;
  return (
    <div className="flex flex-col lg:flex-row max-w-5xl mx-auto">
      <div className="bg-white w-full h-auto shadow-2xl p-8">
        <div className="mb-3">
          <button
            onClick={() => props.OnBack()}
            className="text-indigo-500 font-sm whitespace-nowrap outline-none"
          >
              ← Close
          </button>
        </div>
        <header class="mb-4">
          <h1 class="text-2xl  text-gray-800 font-bold mb-2">{selectedRecipe.title}</h1>
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: selectedRecipe.summary }}></p>
        </header>
        <div className="mb-6">
          <ul className="flex flex-wrap -m-1 ">
            {selectedRecipe.dishTypes.map((dishType, index) => (
              <li key={index} class="m-1">
                <div class="inline-flex items-center justify-center text-sm font-medium rounded-full hw hx border py-1 px-2 text-gray-400 bg-gray-200 shadow">
                  {dishType}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:flex justify-between items-center mb-6">
          <div className="flex items-center mr-4">
            <Link class="block text-sm font-semibold whitespace-normal text-gray-500" to="/">
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
            {selectedRecipe.nutrition.ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.name} - {ingredient.amount}{" "}
                {ingredient.unit === "c" ? "cup" : ingredient.unit}
              </li>
            ))}
          </ul>
          <h2 className="font-bold text-xl mb-2 text-gray-800">Instructions</h2>
          {/* <p dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }}></p> */}
          <ul className="list-decimal list-outside ml-3 mb-6">
            {selectedRecipe.analyzedInstructions[0].steps.map((step) => (
              <li key={step.number}>{step.step}</li>
            ))}
          </ul>
        </div>
      </div>      
    </div>
  );
}
