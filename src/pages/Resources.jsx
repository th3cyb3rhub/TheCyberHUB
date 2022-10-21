import React from "react";
import { Route, Routes } from "react-router-dom";

import {
  ResourcesHome,
  RoadmapResources,
  CyberNews,
  Blogs,
  Events,
  Courses,
  CourseDetail,
  CoursesLayout,
} from "../components";

const Resources = () => {
  return (
    <div>
      <Routes>
        <Route exact path={"/"} element={<ResourcesHome />} />
        <Route exact path={"roadmapResources"} element={<RoadmapResources />} />
        <Route exact path={"blogs/*"} element={<Blogs />} />
        <Route exact path={"events"} element={<Events />} />
        <Route exact path={"cyberNews"} element={<CyberNews />} />

        <Route path="courses" element={<CoursesLayout />}>
          <Route index element={<Courses />} />
          <Route path=":id" element={<CourseDetail />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Resources;
