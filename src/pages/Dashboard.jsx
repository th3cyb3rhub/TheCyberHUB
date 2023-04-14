import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Wrapper } from "../components/Dashboard/Profile/ProfileElements";
import DashboardItems from "../components/Dashboard/DashboardItems";
import { DashboardContainer } from "../components/Dashboard/DashboardElements";
import VerifyToAccess from "../components/Dashboard/VerifyToAccess";
import { useUserData } from "../components/Dashboard/checkUserVerified";

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const userVerified = useUserData({ user }).isVerified;

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    if (!userVerified) {
        return <VerifyToAccess />;
    }

    return (
        <Wrapper>
            <DashboardContainer>
                <section className={"heading"}>
                    <p> Dashboard</p>
                </section>
                <DashboardItems />
            </DashboardContainer>
        </Wrapper>
    );
};

export default Dashboard;
