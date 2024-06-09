import React from "react";
import { Wrapper } from "./Profile/ProfileElements";
import { DashboardContainer } from "./DashboardElements";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "src/features/apiStatus";
import LoadingSpinner from "src/components/Other/MixComponents/Spinner/LoadingSpinner";

const Dashboard = () => {
    const { isApiLoading, isApiWorking } = apiStatus();
    // const [isLoading, setIsLoading] = useState(false);

    if (isApiLoading) return <LoadingSpinner />;
    if (!isApiWorking) return <UnderMaintenance />;

    return (
        <Wrapper>
            <DashboardContainer>{/* <DashboardItems /> */}</DashboardContainer>
        </Wrapper>
    );
};

export default Dashboard;
