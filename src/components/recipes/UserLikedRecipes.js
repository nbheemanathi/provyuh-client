import React from "react";
import { List, Avatar } from "antd";
import { useQuery } from "@apollo/client";
import { FETCH_USER_LIKED_RECIPES } from "../../util/graphql";
import { HeartFilled } from "@ant-design/icons";

export default function UserLikedRecipes(props) {
  const user = props.user;
  const { loading, data } = useQuery(FETCH_USER_LIKED_RECIPES, {
    variables: {
      userId: user.id,
    },
  });

  return (
    <div className="col-span-full xl:col-span-6 h-110 overflow-auto bg-white shadow-lg rounded-sm border border-gray-200  px-5">
      {!loading && (
        <List
          header={
            <div className="flex items-center space-x-3 ">
              <HeartFilled style={{ color: "red" }} /> <p>Liked Recipes</p>
            </div>
          }
          dataSource={data?.getUserLikedRecipes}
          renderItem={(item) => (
            <List.Item key={item.recipeId}>
              <List.Item.Meta
                avatar={<Avatar src={item.imageUrl} />}
                title={
                  <button onClick={() => props.selectedRecipeId(item.recipeId)}>
                    {item.title}
                  </button>
                }
              />
              <div className="hidden lg:block">Actions</div>
            </List.Item>
          )}
        />
      )}
    </div>
  );
}
