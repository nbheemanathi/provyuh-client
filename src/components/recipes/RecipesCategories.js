import React from "react";
import { List } from "antd";
import ImageData from "../../util/imageIcon";
import { Link } from "react-router-dom";

export default function RecipesCategories() {
  const categories = ["Breakfast", "Appetizer", "Main Course", "Soup", "Dessert", "Salad"];
  return (
    <div className="bg-white w-full lg:w-3/12 mb-6 shadow-lg rounded-lg px-4">
      <List
        header={<div>Popular Categories</div>}
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
                    style: "w-10 h-8",
                  }}
                />
              }
              title={
                <Link
                  to={`/recipes/type/${item}`}
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
