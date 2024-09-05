import React from "react";
import { Route, Routes } from "react-router-dom";
import Tools from "./Tools";
import BreachCheck from "./BreachCheck/BreachCheck";
import ReverseShellGenerator from "./ReverseShell/ShellGenerator";
import { NotFound } from "src/components/index";
import PassGen from "./PassGen/PassGen";
import EncoderMain from "./EncoderDecoder.jsx/EncoderMain";
import GtfoBin from "./BinaryExploits/BinaryExploits";
import DataPage from "./BinaryExploits/DataPages";
import GoogleDorks from "./GoogleDork/GoogleDorkMain";
import IPInfo from "src/components/Tools/IPInfo.jsx";
import SubdomainGenerator from "src/components/Tools/SubdomainGenerator.jsx";
import MarkdownEditor from "src/components/Tools/MarkdownEditor.jsx";

const ToolsRoutes = () => {
    return (
        <Routes>
            <Route index element={<Tools />} />
            <Route path={"/breachcheck"} element={<BreachCheck />} />
            <Route path={"/googledorks"} element={<GoogleDorks />} />
            <Route path={"/revshell"} element={<ReverseShellGenerator />} />
            <Route path={"/passgen"} element={<PassGen />} />
            <Route path={"/encoder"} element={<EncoderMain />} />

            <Route path={"/binexploits"} element={<GtfoBin />} />
            <Route path={"/binexploits/:id"} element={<DataPage />} />

            <Route path={"/ipinfo/"} element={<IPInfo />} />
            <Route path={"/subdomain-generator/"} element={<SubdomainGenerator />} />
            <Route path={"/markdown-editor/"} element={<MarkdownEditor />} />

            {/* <Route path={"portScanner"} element={<PortScanner/>}/> */}
            <Route path={"*"} element={<NotFound />} />
            <Route element={<NotFound />} />
        </Routes>
    );
};

export default ToolsRoutes;
