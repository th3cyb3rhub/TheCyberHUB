import React from "react";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { DashboardContainer } from "src/components/Dashboard/DashboardElements";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "src/features/apiStatus";
import LoadingSpinner from "src/components/Other/MixComponents/Spinner/LoadingSpinner";

const AdminDashboard = () => {
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

export default AdminDashboard;
