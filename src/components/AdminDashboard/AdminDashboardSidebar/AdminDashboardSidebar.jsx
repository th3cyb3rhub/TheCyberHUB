import React from "react";
import { BiHomeCircleIcon, MdOutlineEventNoteIcon } from "./AdminDashbaordSidebarElements";
import GeneralDashboardSidebar from "src/components/Common/GeneralDashboardSidebar";

const AdminDashboardSidebar = ({ userDetail }) => {
    const sidebarItems = [
        { to: "/", icon: <BiHomeCircleIcon />, label: "Home" },
        { to: "/admin-dashboard/manage-community-events", icon: <MdOutlineEventNoteIcon />, label: "Community Events" },
    ];

    return <GeneralDashboardSidebar userDetail={userDetail} sidebarItems={sidebarItems} />;
};

export default AdminDashboardSidebar;
