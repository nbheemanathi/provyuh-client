import React from "react";
import { List } from "antd";
import ImageData from "../../util/imageIcon";
import { Link } from "react-router-dom";

export default function RecipesCuisine() {
  const categories = [
    "American",
    "Italian",
    "Chinese",
    "Indian",
    "Mexican",
    "Thai",
    "Japanese",
  ];
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-lg rounded-sm border border-gray-200 px-5">
      <List
        header={<div>Popular Cuisines</div>}
        itemLayout="horizontal"
        dataSource={categories}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <ImageData
                  iconData={{
                    image: item.split(" ").join(""),
                    imageColor: "#F39233",
                    strokeColor: "white",
                    style: "w-6 h-8",
                  }}
                />
              }
              title={
                <Link
                  to={`/recipes/cuisine/${item}`}
                  className="text-sm text-indigo-500 font-medium text-sm outline-none"
                >
                  {item}
                </Link>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
}
