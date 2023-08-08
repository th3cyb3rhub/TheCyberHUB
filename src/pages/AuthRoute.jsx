import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../components";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Register from "./Register";

const AuthRoute = () => {
    return (
        <Routes>
            <Route exact path={"/login"} element={<Login />} />
            <Route exact path={"/forgetPassword"} element={<ForgotPassword />} />
            <Route exact path={"/resetPassword/:token"} element={<ResetPassword />} />
            <Route exact path={"/register"} element={<Register />} />
        </Routes>
    );
};

export default AuthRoute;
