import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoutePhysician = ({
  authenticate,
  account_type,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticate & (account_type === "/medmemo/physician") ? (
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

export default ProtectedRoutePhysician;
