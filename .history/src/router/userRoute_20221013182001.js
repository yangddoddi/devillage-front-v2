import React from "react";
import { Route } from "react-router-dom";
import { redirect } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const UserRoute = ({ component: Component, ...rest }) => {
  const isLogin = localStorage.getItem("accessToken");
  return (
    <Route
      {...rest}
      render={(props) => {
        !isLogin && alert("로그인이 필요합니다.");
        return isLogin ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};
