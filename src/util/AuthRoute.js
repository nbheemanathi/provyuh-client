import React, { useState, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import SideMenu from "../partials/SideMenu";
import { AuthContext } from "../context/auth";
import MainHeader from "../partials/MainHeader";

function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (props.location.pathname !== "/login" && props.location.pathname !== "/register") {
          if (props.location.pathname !== "/") {
            return user ? (
              <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <SideMenu sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                  <MainHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                  <main className="h-screen">
                    <Component {...props} />
                  </main>
                </div>
              </div>
            ) : (
              <Redirect to="/login" />
            );
          } else return user ? <Component {...props} /> : <Redirect to="/login" />;
        } else return user ? <Redirect to="/" /> : <Component {...props} />;
      }}
    />
  );
}

export default AuthRoute;
