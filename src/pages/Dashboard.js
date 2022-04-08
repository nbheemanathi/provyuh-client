import React, { useContext, useState, useRef } from "react";
import { AuthContext } from "../context/auth";
import UserRecipesCard from "../partials/dashboard/UserRecipesCard";
import { useApolloClient } from "@apollo/client";
import { LOGIN_USER } from "../util/graphql";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const client = useApolloClient();
  console.log(user)
  // const { data } = client.readQuery({
  //   query: LOGIN_USER,     

  // });
  // console.log(data);
  return (
    <div >
      <WelcomeBanner />
      <div className="grid grid-cols-12 gap-6">
        {/* <UserRecipesCard recipes={user?.userSavedRecipes}/> */}
      </div>
    </div>
  );
}
