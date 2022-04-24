import React from "react";
import { List, Avatar, Button } from "antd";
import { useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { FETCH_USER_LIKED_RECIPES, USER_RECIPE_MUTATION } from "../../util/graphql";
import { HeartFilled, DeleteOutlined } from "@ant-design/icons";

export default function UserLikedRecipes(props) {
  const history = useHistory();
  const user = props.user;
  const { loading, data } = useQuery(FETCH_USER_LIKED_RECIPES, {
    variables: {
      userId: user.id,
    },
  });
  const [saveUserRecipe] = useMutation(USER_RECIPE_MUTATION, {
    update(cache, result) {
      const data = cache.readQuery({
        query: FETCH_USER_LIKED_RECIPES,
        variables: {
          userId: user.id,
        },
      });
      if (data) {
        //we are only deleting from cache here.
        // const cachedRecipes = [...userLikedRecipes.getUserLikedRecipes];
        // cachedRecipes.map((obj) => result.data.saveUserRecipe.recipeID === obj.recipeID || obj);
        const cachedData = data.getUserLikedRecipes.filter(
          (s) => s.recipeId !== result.data.saveUserRecipe.recipeId
        );
        cache.writeQuery({
          query: FETCH_USER_LIKED_RECIPES,
          variables: {
            userId: user.id,
          },
          data: { getUserLikedRecipes: cachedData },
        });
      }
    },
  });

  const removeLikedRecipe = (recipe) => {
    saveUserRecipe({
      variables: {
        liked: false,
        recipeId: parseInt(recipe.recipeId),
        title: recipe.title,
        imageUrl: recipe.imageUrl,
      },
    });
  };

  const onRecipeView = (recipeId) => {
    history.push(`/recipes/${recipeId}`)
    // props.selectedRecipeId(item.recipeId)
  }
  return (
    <div className="col-span-full xl:col-span-6 h-110 overflow-auto bg-white shadow-lg rounded-sm border border-gray-200  px-5">
      {!loading && (
        <List
          header={
            <div className="flex items-center space-x-3 ">
              <HeartFilled style={{ color: "red" }} />{" "}
              <p>Liked Recipes ({data?.getUserLikedRecipes.length})</p>
            </div>
          }
          dataSource={data?.getUserLikedRecipes}
          renderItem={(item) => (
            <List.Item key={item.recipeId}>
              <List.Item.Meta
                avatar={<Avatar src={item.imageUrl} />}
                title={
                  <button onClick={() => onRecipeView(item.recipeId)}>
                    {item.title}
                  </button>
                }
              />
              <div className="hidden lg:block">
                <Button
                  onClick={() => removeLikedRecipe(item)}
                  type="text"
                  icon={<DeleteOutlined style={{ color: "red" }} />}
                  size="large"
                />
              </div>
            </List.Item>
          )}
        />
      )}
    </div>
  );
}
