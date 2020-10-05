import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../App";
const PrivateRoute = ({ children, ...rest }) => {
  const [loggedInUser, setLoggedInuser] = useContext(UserContext);

  let storedUser = JSON.parse(sessionStorage.getItem("user"));
  return (
    <Route
      {...rest}
      render={({ location }) =>
        // loggedInUser.isAuthenticated || storedUser.isAuthenticated
        loggedInUser.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
