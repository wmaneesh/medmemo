import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRouteNurse = ({
  authenticate,
  accountType,
  path,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticate & (accountType === path) ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/medmemo/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRouteNurse;
