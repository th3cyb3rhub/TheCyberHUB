import React from "react";
import { Route, Routes } from "react-router-dom";

import { PrepHome, InterviewQuestions, InterviewExperiences, Quiz, Jobs } from "../components";

const Prep = () => {
  return (
    <div>
      <Routes>
        <Route exact path={"/"} element={<PrepHome />} />
        <Route exact path={"InterviewQuestions"} element={<InterviewQuestions />} />
        <Route exact path={"InterviewExperiences"} element={<InterviewExperiences />} />
        <Route exact path={"Quiz"} element={<Quiz />} />
        <Route exact path={"Jobs"} element={<Jobs />} />
      </Routes>
    </div>
  );
};

export default Prep;
