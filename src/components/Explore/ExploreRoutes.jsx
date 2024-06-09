import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "src/components/index";
import Explore from "./Explore";

const ExploreRoutes = () => {
    return (
        <Routes>
            <Route index element={<Explore />} />
            <Route path={"*"} element={<NotFound />} />
        </Routes>
    );
};

export default ExploreRoutes;
