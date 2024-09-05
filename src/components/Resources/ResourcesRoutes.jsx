import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "src/components/index";
import Methodology from "src/components/Resources/Methodology/MethodologyMain.jsx";
import Checklist from "src/components/Resources/Checklist/Checklist.jsx";
import Hacklist from "src/components/Resources/Hacklist/Hacklist.jsx";
import Cheatsheets from "src/components/Resources/Cheatsheets/Cheatsheets.jsx";
import Payloads from "src/components/Resources/Payloads/Payloads.jsx";

const ResourcesRoutes = () => {
    return (
        <Routes>
            <Route path={"/methodology"} element={<Methodology />} />
            <Route path={"/checklist"} element={<Checklist />} />
            <Route path={"/hacklist"} element={<Hacklist />} />
            <Route path={"/cheatsheets"} element={<Cheatsheets />} />
            <Route path={"/payloads"} element={<Payloads />} />

            <Route path={"*"} element={<NotFound />} />
            <Route element={<NotFound />} />
        </Routes>
    );
};

export default ResourcesRoutes;
