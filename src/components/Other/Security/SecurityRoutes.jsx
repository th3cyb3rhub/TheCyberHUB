import React from "react";
import { Route, Routes } from "react-router-dom";
import Security from "./Security";
import HallOfFame from "./HallOfFame";
import RulesOfEngagement from "./RulesOfEngagement";

const SecurityRoutes = () => {
    return (
        <Routes>
            <Route index element={<Security />} />
            <Route path={"hall-of-fame"} element={<HallOfFame />} />
            <Route path={"rules-of-engagement"} element={<RulesOfEngagement />} />
        </Routes>
    );
};

export default SecurityRoutes;
