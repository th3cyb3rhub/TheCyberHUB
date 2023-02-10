import React from "react";
import { DashboardItemsContainer } from "./DashboardElements";
import FormData from "./FormData/FormData";

const DashboardItems = () => {
    return (
        <DashboardItemsContainer>
            <FormData />
            {/* <DashboardItemsLink to={"/dashboard/blogs"}>Blogs</DashboardItemsLink> */}
            {/* <DashboardItemsLink to={"/dashboard/goals"}>Goals</DashboardItemsLink> */}
        </DashboardItemsContainer>
    );
};

export default DashboardItems;
