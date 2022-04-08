import React from "react";
import { List, message, Avatar, Skeleton, Divider } from "antd";
import { useQuery } from "@apollo/client";
import { FETCH_USER_LIKED_RECIPES } from "../../util/graphql";
import InfiniteScroll from "react-infinite-scroll-component";
import { HeartFilled } from "@ant-design/icons";

export default function UserLikedRecipes(props) {
  const user = props.user;
  const { loading, data } = useQuery(FETCH_USER_LIKED_RECIPES, {
    variables: {
      userId: user.id,
    },
  });

  return (
    <div className="bg-white w-full flex-1 mb-6 h-110 overflow-auto shadow-lg rounded-lg px-4">
      {!loading && (
        <List
        header={
          <div className="flex items-center space-x-3 ">
            <HeartFilled  style={{color:'red'}}/> <p>Liked Recipes</p>
          </div>
        }
        dataSource={data?.getUserLikedRecipes}
        renderItem={(item) => (
          <List.Item key={item.recipeId}>
            <List.Item.Meta
              avatar={<Avatar src={item.imageUrl} />}
              title={item.title}
            />
            <div>Actions</div>
          </List.Item>
        )}
      />
      )}
    </div>
  );
}
