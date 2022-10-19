import React from "react";
import { Route, Routes } from "react-router-dom";
import AllOsp from "./AllOsp";
import ViewOsp from "./ViewOsp";
import "./OpenSourceProjects.css";

const OpenSourceProjects = () => {
  return (
    <>
      <Routes>
        <Route exact path={""} element={<AllOsp />} />
        <Route exact path={":title"} element={<ViewOsp />} />
      </Routes>
    </>
  );
};

export default OpenSourceProjects;
