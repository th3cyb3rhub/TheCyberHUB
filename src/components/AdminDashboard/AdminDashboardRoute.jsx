import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { NotFound } from "src/components/index";
import AdminDashboardSidebar from "./AdminDashboardSidebar/AdminDashboardSidebar";
import { DashboardRoutesContainer } from "src/components/Dashboard/DashboardElements";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDetails } from "src/features/userDetail/userDetailSlice";
import AdminDashboard from "./AdminDashboard";
import ManageCommunityEvents from "./ManageCommunityEvents/ManageCommunityEvents";

const DashboardRoute = () => {
    const dispatch = useDispatch();
    const { userDetails } = useSelector((state) => state.userDetail);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || (user?.userType !== "admin" && user?.userType !== "team")) {
            navigate("/");
        }
        // setTimeout(() => {
        //     setIsLoading(false);
        // }, 1000);
    }, [user, navigate]);

    useEffect(() => {
        if (user) dispatch(getAllUserDetails());
    }, [dispatch, user]);

    const userDetail = userDetails?.find((userDetail) => userDetail?.user === user?._id);

    return (
        <DashboardRoutesContainer>
            <AdminDashboardSidebar userDetail={userDetail} />
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
                    <Route index element={<AdminDashboard />} />
                    <Route path={"manage-community-events"} element={<ManageCommunityEvents />} />
                    <Route path={"*"} element={<NotFound />} />
                </Routes>
            </div>
        </DashboardRoutesContainer>
    );
};

export default DashboardRoute;
