import React, { useContext, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import routeNames from "./routeNames";

export const ProtectedRoute = ({ allowedUsers = [], ...params }) => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.role && user?.token) {
      navigate(routeNames.general.login);
    } else {
      if (!allowedUsers.includes(user.role)) {
        navigate(-1);
      }
    }
  }, [user]);

  return <Route {...params} />;
};
