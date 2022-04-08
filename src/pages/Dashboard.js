import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <div >
      <WelcomeBanner />
      <div className="grid grid-cols-12 gap-6">
        {/* <UserRecipesCard recipes={user?.userSavedRecipes}/> */}
      </div>
    </div>
  );
}
