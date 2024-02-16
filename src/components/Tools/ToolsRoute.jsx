import React from "react";
import { Route, Routes } from "react-router-dom";
import Tools from "./Tools";
import BreachCheck from "./BreachCheck/BreachCheck";
import SubdomainFinder from "./SubdomainFinder/SubdomainFinder";
import ReverseShellGenerator from "./ReverseShell/ShellGenerator";
import { NotFound } from "../index";
import PassGen from "./PassGen/PassGen";
import EncoderMain from "../EncoderDecoder.jsx/EncoderMain";
import GtfoBin from "../GTFOBins/GtfoMain";
import DataPage from "../GTFOBins/DataPages";
import Dorking from "./Dorking/Dorking";

const ToolsRoutes = () => {
    return (
        <Routes>
            <Route index element={<Tools />} />
            <Route path={"/breachcheck"} element={<BreachCheck />} />
            <Route path={"/subfinder"} element={<SubdomainFinder />} />
            <Route path={"/revshell"} element={<ReverseShellGenerator />} />
            <Route path={"/passgen"} element={<PassGen />} />
            <Route path={"/encoder"} element={<EncoderMain />} />
            <Route path={"/binexploits"} element={<GtfoBin />} />
            <Route path={"/binexploits/:id"} element={<DataPage />} />
            <Route path={"/dorking"} element={<Dorking />} />

            {/* <Route path={"portScanner"} element={<PortScanner/>}/> */}
            <Route path={"*"} element={<NotFound />} />
            <Route element={<NotFound />} />
        </Routes>
    );
};

export default ToolsRoutes;
