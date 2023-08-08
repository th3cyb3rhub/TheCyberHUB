import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Wrapper } from "./Profile/ProfileElements";
import DashboardItems from "./OldDashbaord/DashboardItems";
import { DashboardContainer } from "./DashboardElements";
import UnderMaintenance from "../Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "../../features/apiStatus";
import LoadingSpinner from "../Other/MixComponents/Spinner/LoadingSpinner";
// import Sidebar from "./Sidebar/Sidebar";
// import AuthPopup from "../../pages/AuthPopup/AuthPopup";

const Dashboard = () => {
    const navigate = useNavigate();
    // const [isLoading, setIsLoading] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const { isApiLoading, isApiWorking } = apiStatus();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
        // setTimeout(() => {
        //     setIsLoading(false);
        // }, 1000);
    }, [user, navigate]);

    if (isApiLoading) return <LoadingSpinner />;

    if (!isApiWorking) return <UnderMaintenance />;

    return (
        <Wrapper>
            <DashboardContainer>
                <DashboardItems />
            </DashboardContainer>
        </Wrapper>
    );
};

export default Dashboard;
