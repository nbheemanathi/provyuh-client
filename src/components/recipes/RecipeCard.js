import React, { useState, useContext } from "react";
import { Card } from "antd";
import { EllipsisOutlined, ClockCircleOutlined, EyeOutlined } from "@ant-design/icons";
import { Icon } from "@ant-design/compatible";
import { AuthContext } from "../../context/auth";
import { useMutation } from "@apollo/client";
import {
  FETCH_RECIPES_QUERY,
  FETCH_USER_LIKED_RECIPES,
  USER_RECIPE_MUTATION,
} from "../../util/graphql";
import { useHistory } from "react-router-dom";

export default function RecipeCard(props) {
  const history = useHistory();
  const recipe = props.recipe;
  const { Meta } = Card;
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(props.recipe.liked);
  const renderNutrients = (nutrients, type) => {
    const filteredNutrient = nutrients.find((s) => s.name === type);
    if (filteredNutrient) {
      return filteredNutrient.amount + "" + filteredNutrient.unit.charAt(0);
    }
    return "N/A";
  };

  const [saveUserRecipe] = useMutation(USER_RECIPE_MUTATION, {
    update(cache, result) {
      // const data = cache.readQuery({
      //   query: FETCH_RECIPES_QUERY,
      //   variables:
      //     props.currentParentData.recipeType === "type"
      //       ? {
      //           type: props.currentParentData.recipeValue.toLowerCase(),
      //           number: 12,
      //           offset: 0,
      //           addRecipeNutrition: true,
      //           user: user.id,
      //         }
      //       : {
      //           cuisine: props.currentParentData.recipeValue.toLowerCase(),
      //           number: 12,
      //           offset: 0,
      //           addRecipeNutrition: true,
      //           user: user.id,
      //         },
      // });
      // if (data) {
      //   const newData = data.getRandomRecipesOnLimit.results.map((recipe) => {
      //     if (recipe.id == result.data.saveUserRecipe.recipeId) {
      //       return Object.assign({}, recipe, { liked: liked });
      //     }
      //     return recipe;
      //   });
      //   cache.writeQuery({
      //     query: FETCH_RECIPES_QUERY,
      //     variables:
      //       props.currentParentData.recipeType === "type"
      //         ? {
      //             type: props.currentParentData.recipeValue.toLowerCase(),
      //             number: 12,
      //             offset: 0,
      //             addRecipeNutrition: true,
      //             user: user.id,
      //           }
      //         : {
      //             cuisine: props.currentParentData.recipeValue.toLowerCase(),
      //             number: 12,
      //             offset: 0,
      //             addRecipeNutrition: true,
      //             user: user.id,
      //           },
      //     data: { getRandomRecipesOnLimit: { results: newData } },
      //   });
      // }
      const userLikedRecipes = cache.readQuery({
        query: FETCH_USER_LIKED_RECIPES,
        variables: {
          userId: user.id,
        },
      });
      if (userLikedRecipes) {
        if (result.data.saveUserRecipe.status) {
          const newRecipe = {
            recipeId: result.data.saveUserRecipe.recipeID,
            title: result.data.saveUserRecipe.title,
            imageUrl: result.data.saveUserRecipe.imageUrl,
          };
          const updatedUserLikedRecipes = [...userLikedRecipes.getUserLikedRecipes, newRecipe];
          cache.writeQuery({
            query: FETCH_USER_LIKED_RECIPES,
            variables: {
              userId: user.id,
            },
            data: { getUserLikedRecipes: updatedUserLikedRecipes },
          });
        } else {
          const cachedRecipes = [...userLikedRecipes.getUserLikedRecipes];
          cachedRecipes.map((obj) => result.data.saveUserRecipe.recipeID === obj.recipeID || obj);
          cache.writeQuery({
            query: FETCH_USER_LIKED_RECIPES,
            variables: {
              userId: user.id,
            },
            data: { getUserLikedRecipes: cachedRecipes },
          });
        }
      }
    },
    onError(err) {
      console.log(err);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  const updateRecipeLikeStatus = (value) => {
    saveUserRecipe({
      variables: {
        liked: value,
        recipeId: parseInt(recipe.id),
        title: recipe.title,
        imageUrl: recipe.image,
      },
    });
  };
  const onRecipeView = () => {
    if (props.infoType !== null && props.infoType === "search") {
      props.onView();
    } else {
      history.push(`/recipes/${recipe.id}`);
    }
  };

  return (
    <Card
      hoverable
      cover={
        <img style={{ height: "140px", objectFit: "cover" }} alt="example" src={recipe.image} />
      }
      actions={[
        <Icon
          type="heart"
          style={{ fontSize: "16px", color: "red" }}
          theme={liked ? "filled" : "outlined"}
          onClick={() => {
            setLiked(!liked);
            updateRecipeLikeStatus(!liked);
          }}
        />,
        <EyeOutlined key="view" onClick={() => onRecipeView()} />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        title={recipe.title}
        description={
          <>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1 text-xs">
                <ClockCircleOutlined />
                <p>{recipe.readyInMinutes} mins</p>
              </div>
              <p className="text-xs">
                Calories(
                {renderNutrients(recipe.nutrition.nutrients, "Calories")})
              </p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs">
                Sugar(
                {renderNutrients(recipe.nutrition.nutrients, "Sugar")})
              </p>
              <p className="text-xs">
                Protein(
                {renderNutrients(recipe.nutrition.nutrients, "Protein")})
              </p>
            </div>
          </>
        }
      />
    </Card>
  );
}
