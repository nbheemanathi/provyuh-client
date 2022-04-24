import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../context/auth";
import AuthRoute from "./AuthRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Recipes from "../pages/Recipes";
import RecipesByType from "../pages/RecipesByType";
import SideMenu from "../partials/sideMenu/SideMenu";
import { Layout } from "antd";
import Header from "../partials/header/Header";
import MainContent from "../partials/mainContent/MainContent";
import UserRecipes from "../pages/UserRecipes";
import RecipeInformation from "../components/recipes/RecipeInformation";
import Scheduler from "../pages/Scheduler";

export default function AppRouter() {
  const [collapse, setCollapse] = useState(false);
  const [sideMenuVisible, setSideMenuVisible] = useState(false)
  return (
    <AuthProvider>
      <Router>
        <Layout hasSider>
          <SideMenu OnCollapse={(collapse) => setCollapse(collapse)} SideMenuVisible={(value) => setSideMenuVisible(value)} />
          <Layout
            className={`site-layout ${sideMenuVisible && (!collapse ? "ml-md" : "ml-20")}`}
          >
            <Header />
            <MainContent>
              <AuthRoute exact path="/" component={Home} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/dashboard" component={Dashboard} />
              <AuthRoute exact path="/register" component={Register} />
              <AuthRoute exact path="/recipes" component={Recipes} />
              <AuthRoute exact path="/recipes/:id" component={RecipeInformation} />
              <AuthRoute exact path="/recipes/:type/:value" component={RecipesByType} />
              <AuthRoute exact path="/userRecipes" component={UserRecipes} />
              <AuthRoute exact path="/scheduler" component={Scheduler} />
              
            </MainContent>
          </Layout>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
