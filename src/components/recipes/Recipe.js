import React from "react";
import { FETCH_RECIPE_INFO } from "../../util/graphql";
import { useQuery } from "@apollo/client";

export default function Recipe(props) {
  const recipeId = props.recipeId;
  const { loading, data } = useQuery(FETCH_RECIPE_INFO, {
    variables: {
      id: parseInt(recipeId),
    },
  });

  return (
    <div>
      {!loading && (
        <div>
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: data.getRecipeInformation.summary }}></p>
          <figure class="my-6 flex justify-center">
            <img
              class="w-auto rounded-sm h-auto object-cover"
              src={data.getRecipeInformation.image}
              alt="Product"
            />
          </figure>
          <div>
            <h2 className="font-bold text-xl mb-2 text-gray-800">Ingredients</h2>
            <ul className="list-disc list-inside mb-6">
              {data.getRecipeInformation.nutrition.ingredients.map((ingredient) => (
                <li key={ingredient.id}>
                  {ingredient.name} - {ingredient.amount}{" "}
                  {ingredient.unit === "c" ? "cup" : ingredient.unit}
                </li>
              ))}
            </ul>
            {data.getRecipeInformation.analyzedInstructions.length > 0 && (
              <div>
                <h2 className="font-bold text-xl mb-2 text-gray-800">Instructions</h2>
                <ul className="list-decimal list-outside ml-3 mb-6">
                  {data.getRecipeInformation.analyzedInstructions[0].steps?.map((step) => (
                    <li key={step.number}>{step.step}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
