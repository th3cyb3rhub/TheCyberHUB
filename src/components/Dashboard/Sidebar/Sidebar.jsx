import React from "react";
import { DashboardSidebarContainer, RouteLink, SidebarTitle } from "./SidebarElements";

const Sidebar = () => {
    return (
        <DashboardSidebarContainer>
            <section className={"heading"}>
                <p> Dashboard</p>
            </section>
            <RouteLink to={"/"}>
                <SidebarTitle> Home </SidebarTitle>
            </RouteLink>
            <RouteLink to={"/dashboard/bookmarks"}>
                <SidebarTitle> Bookmarks </SidebarTitle>
            </RouteLink>

            <SidebarTitle> Analytics </SidebarTitle>
            <SidebarTitle> Settings </SidebarTitle>
        </DashboardSidebarContainer>
    );
};

export default Sidebar;
