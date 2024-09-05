import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { NotFound } from "src/components/index";
import DashboardSidebar from "./DashbaordSidebar/DashboardSidebar";
import { DashboardRoutesContainer } from "./DashboardElements";
import Bookmarks from "./Bookmarks/Bookmarks";
import NoteApp from "./Notetaker/NoteApp";
import Tools from "src/components/Tools/Tools";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDetails } from "src/features/userDetail/userDetailSlice";
import { Analytics } from "./Analytics/Analytics";
import ReconageRoutes from "src/components/Tools/Reconage/ReconageRoutes.jsx";
// import CommunityChat from "src/components/Chat/CommunityChat.jsx";

const DashboardRoute = () => {
    const dispatch = useDispatch();
    const { userDetails } = useSelector((state) => state.userDetail);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        if (user) dispatch(getAllUserDetails());
    }, [dispatch, user]);

    const userDetail = userDetails?.find((userDetail) => userDetail?.user === user?._id);

    return (
        <DashboardRoutesContainer>
            <DashboardSidebar userDetail={userDetail} />
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
                    {/* <Route path={"chat/*"} element={<CommunityChat userDetails={userDetails} />} /> */}
                    <Route path={"reconage/*"} element={<ReconageRoutes />} />

                    <Route path={"*"} element={<NotFound />} />
                </Routes>
            </div>
        </DashboardRoutesContainer>
    );
};

export default DashboardRoute;
