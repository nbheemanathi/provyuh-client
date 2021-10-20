import React from "react";
import { Link } from "react-router-dom";
import { mainCourse, fries, soup, breakFast, dessert, salad } from "../images/icons/icon";

export default function Recipes() {
  const Categories = [
    {
      name: "Breakfast",
      tags: ["breakfast", "bread"],
      image: breakFast,
    },
    {
      name: "Appetizers",
      tags: ["appetizer", "snack"],
      image: fries,
    },
    {
      name: "Main Course",
      tags: ["main course"],
      image: mainCourse,
    },
    {
      name: "Soup",
      tags: ["soup"],
      image: soup,
    },
    {
      name: "Dessert",
      tags: ["dessert"],
      image: dessert,
    },
    {
      name: "Salad",
      tags: ["salad"],
      image: salad,
    },
  ];
  return (
    // <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto ">
    <div className="container px-4 lg:px-8 py-6 mx-auto ">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-500 text-lg font-semibold">Categories</h3>
        <div className="relative inline-flex">
          <button className=" inline-flex justify-center items-center group">
            <div className="flex items-center truncate">
              <span className="truncate ml-2 text-sm font-medium group-hover:text-gray-800">
                See All
              </span>
              <svg className="h-4 w-4 fill-current text-gray-400" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      </div>
      <div className="invisible md:visible flex justify-evenly mt-2 space-x-3 ">
        {Categories.map((category, index) => (
          <Link key={index} to={`/recipes/${category.name}`} className="bg-white flex-1 p-4 rounded text-center border border-gray-200 shadow-lg hover:text-indigo-500 hover:border-indigo-500">
            <img src={category.image} width="32" height="32" alt="Icon 01" className="mx-auto" />
            <p className="text-base mt-2 font-semibold">{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
