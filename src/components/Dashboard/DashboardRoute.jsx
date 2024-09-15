import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { NotFound } from "src/components/index";
import DashboardSidebar from "./DashbaordSidebar/DashboardSidebar";
import { DashboardRoutesContainer } from "./DashboardElements";
import Bookmarks from "./Bookmarks/Bookmarks";
import NoteApp from "./Notetaker/NoteApp";
import Tools from "src/components/Tools/Tools";
import { useSelector } from "react-redux";
import { Analytics } from "./Analytics/Analytics";
import ReconageRoutes from "src/components/Tools/Reconage/ReconageRoutes.jsx";
import CommunityChat from "src/components/Chat/CommunityChat.jsx";
// import CommunityChat from "src/components/Chat/CommunityChat.jsx";

const DashboardRoute = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <DashboardRoutesContainer>
            <DashboardSidebar userDetail={user} />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                }}
            >
                <Routes>
                    <Route index element={<NoteApp />} />
                    <Route path={"analytics"} element={<Analytics />} />
                    <Route path={"saved"} element={<Bookmarks />} />
                    <Route path={"notes"} element={<NoteApp />} />
                    <Route path={"tools"} element={<Tools />} />
                    <Route path={"chat/*"} element={<CommunityChat />} />
                    <Route path={"reconage/*"} element={<ReconageRoutes />} />

                    <Route path={"*"} element={<NotFound />} />
                </Routes>
            </div>
        </DashboardRoutesContainer>
    );
};

export default DashboardRoute;
