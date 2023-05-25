import React from "react";
import { DashboardSidebarContainer } from "./DashboardSidebarElements";

const DashboardSidebar = () => {
    return (
        <DashboardSidebarContainer>
            <section className={"heading"}>
                <p> Dashboard</p>
            </section>
            <h3> Manage Blogs </h3>
            <h3> Goals </h3>
            <h3> Tools </h3>
            <h3> . . .</h3>
        </DashboardSidebarContainer>
    );
};

export default DashboardSidebar;
