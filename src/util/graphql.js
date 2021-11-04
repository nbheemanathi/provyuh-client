import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export const FETCH_RECIPES_QUERY = gql`
  query ($type: String!, $number: Int!, $offset: Int!, $addRecipeNutrition: Boolean) {
    getRandomRecipesOnLimit(
      type: $type
      number: $number
      offset: $offset
      addRecipeNutrition: $addRecipeNutrition
    ) {
      results {
        id
        title
        summary
        image
        imageType
        servings
        readyInMinutes
        dishTypes
        vegetarian
        dairyFree
        vegan
        healthScore
        occasions
        creditsText
        dishTypes
        diets
        nutrition {
          nutrients {
            amount
            name
            unit
            title
          }
          ingredients {
            aisle
            id
            amount
            name
            unit
          }
        }
        analyzedInstructions {
          steps {
            number
            step
          }
        }
      }
      totalResults
      offset
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;
export const USER_RECIPE_MUTATION = gql`
  mutation saveUserRecipe($recipeId: Int!,$title: String!,$imageUrl: String) {
    saveUserRecipe(recipeId: $recipeId, title:$title, imageUrl:$imageUrl) {
      id
      user
      recipes {
        recipeId
        title
        imageUrl
      }      
    }
  }
`;
