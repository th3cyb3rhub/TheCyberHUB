import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound, Roadmap, Roadmaps } from "src/components/index";

const RoadmapsRoute = () => {
    return (
        <Routes>
            <Route index element={<Roadmaps />} />
            <Route path={":title"} element={<Roadmap />} />
            <Route path={"*"} element={<NotFound />} />
        </Routes>
    );
};

export default RoadmapsRoute;
