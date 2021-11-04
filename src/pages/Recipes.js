import React from "react";
import { Link } from "react-router-dom";
import imageIcon from "../util/imageIcon";
export default function Recipes() {
  const categories = [
    {
      name: "Breakfast",
      tags: ["breakfast", "bread"],
      image: "BreakFast",
      imageColor:"rgba(99, 102, 241, 1)",
      _id:1
    },
    {
      name: "Appetizers",
      tags: ["appetizer", "snack"],
      imageColor:"rgba(99, 102, 241, 1)",
      image: "Fries",
      _id:2
    },
    {
      name: "Main Course",
      tags: ["main course"],
      image: "MainCourse",
      imageColor:"rgba(99, 102, 241, 1)",
      _id:3
    },
    {
      name: "Soup",
      tags: ["soup"],
      image: "Soup",
      imageColor:"rgba(99, 102, 241, 1)",
      _id:4
    },
    {
      name: "Dessert",
      tags: ["dessert"],
      image: "Dessert",
      imageColor:"rgba(99, 102, 241, 1)",
      _id:5
    },
    {
      name: "Salad",
      tags: ["salad"],
      image: "Salad",
      imageColor:"rgba(99, 102, 241, 1)",
      _id:6
    },
  ];
  
  return (
    // <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto ">
    <div className="container px-4 lg:px-8 py-6 mx-auto ">
      <h2 className="text-gray-800 font-bold text-xl mb-5">Popular Categories</h2>
      <div className="grid grid-cols-12	gap-6">
        {categories.map((category) => (
          <div key={category._id} className="col-span-full sm:col-span-6 xl:col-span-2 shadow-lg bg-white rounded-sm border border-gray-200">
            <div className="flex text-center py-5 flex-col h-full">
              <div className="flex-grow mb-1">
                <div className="inline-flex justify-center content-center items-center bg-gray-100 rounded-full w-16 h-16 mb-2">                 
                  {imageIcon(category)}
                </div>
                <h3 className="text-gray-800 font-semibold text-lg mb-1">{category.name}</h3>
              </div>
              <div>
                <Link
                  to={`/recipes/${category.name}`}
                  className="text-sm text-indigo-500 font-medium text-sm outline-none"
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
