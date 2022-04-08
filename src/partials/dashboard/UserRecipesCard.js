import React from "react";

export default function UserRecipesCard(props) {
  const userSavedRecipes = props.recipes;
  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800">Recipes Saved</h2>
      </header>
      <div className="p-3  overflow-y-scroll max-h-72 ">
        <ul className="my-1">
          {/* Item */}
          {userSavedRecipes.map((recipes) => (
            <li key={recipes.recipeId} className="flex px-2">
              <img
                className="-9 h-9 rounded-full flex-shrink-0 bg-indigo-500 my-2 mr-3 object-cover"
                src={recipes.imageUrl}
                width="36"
                height="36"
                alt="User 01"
              />
              <div className="flex-grow flex items-center border-b border-gray-100 text-sm py-2">
                <div className="flex-grow flex justify-between font-medium">
                  <div className="self-center  text-gray-700 hover:text-gray-900">
                    {recipes.title}
                  </div>
                  <div className="flex-shrink-0 self-end ml-2">
                    <a className="text-indigo-500 hover:text-indigo-600" href="#0">
                      View<span className="hidden sm:inline"> -&gt;</span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
