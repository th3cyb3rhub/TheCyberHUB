import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "src/components/index";
import Reconage from "src/components/Tools/Reconage/Reconage.jsx";
import ReconageSidebar from "src/components/Tools/Reconage/ReconageSidebar.jsx";
import ReconTools from "src/components/Tools/Reconage/ReconTools/ReconTools.jsx";
import Subfinder from "src/components/Tools/Reconage/ReconTools/Subfinder.jsx";
import UrlFinder from "src/components/Tools/Reconage/ReconTools/UrlFinder.jsx";
import PortScanner from "src/components/Tools/Reconage/ReconTools/PortScanner.jsx";
import TechnologyFinder from "src/components/Tools/Reconage/ReconTools/TechnologyFinder.jsx";
import Assets from "src/components/Tools/Reconage/Assets/Assets.jsx";
import Asset from "src/components/Tools/Reconage/Assets/Asset.jsx";

const ReconageRoutes = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
            }}
        >
            <ReconageSidebar />

            <Routes>
                <Route index element={<Reconage />} />

                <Route path={"tools"} element={<ReconTools />} />
                <Route path={"tools/subfinder"} element={<Subfinder />} />
                <Route path={"tools/urlfinder"} element={<UrlFinder />} />
                <Route path={"tools/portscanner"} element={<PortScanner />} />
                <Route path={"tools/technologyfinder"} element={<TechnologyFinder />} />

                <Route path={"assets"} element={<Assets />} />
                <Route path={"assets/:id"} element={<Asset />} />

                <Route path={"*"} element={<NotFound />} />
                <Route element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default ReconageRoutes;
