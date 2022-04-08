import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth";

function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (props.location.pathname !== "/login" && props.location.pathname !== "/register") {
          if (props.location.pathname !== "/") {
            return user ? <Component {...props} /> : <Redirect to="/login" />;
          } else return user ? <Redirect to="/dashboard" /> : <Component {...props} />;
        } else return user ? <Redirect to="/dashboard" /> : <Component {...props} />;
      }}
    />
  );
}
export default AuthRoute;
