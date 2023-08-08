import React from "react";
import { Route, Routes } from "react-router-dom";
import { CertificateCard, CTF, NotFound } from "../index";
import SingleCTF from "./SingleCTF/SingleCTF";
import CreateCTF from "./CreateCTF";

const CtfRoute = () => {
    return (
        <Routes>
            <Route index element={<CTF />} />
            <Route path={":type/:difficulty/:ctfId"} element={<SingleCTF />} />
            <Route path={"create"} element={<CreateCTF />} />
            <Route path={"certificate/:id"} element={<CertificateCard />} />
            <Route path={"*"} element={<NotFound />} />
        </Routes>
    );
};

export default CtfRoute;
