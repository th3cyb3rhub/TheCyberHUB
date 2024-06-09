import React from "react";
import {
    BiHomeCircleIcon,
    // BiChatIcon,
    PiNotebookDuotoneIcon,
    // MdAnalyticsIcon,
    BiBookmarksIcon,
    // BsClipboardCheckIcon,
} from "./DashbaordSidebarElements";
import GeneralDashboardSidebar from "src/components/Common/GeneralDashboardSidebar";
import { GiTridentShield } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";

const DashboardSidebar = ({ userDetail }) => {
    const sidebarItems = [
        { to: "/", icon: <BiHomeCircleIcon />, label: "Home" },
        // { to: "/dashboard/chat", icon: <BiChatIcon />, label: "Chat" },
        { to: "/dashboard/notes", icon: <PiNotebookDuotoneIcon />, label: "Notes" },
        { to: "/dashboard/reconage", icon: <GiTridentShield size={30} />, label: "Reconage" },
        { to: "/dashboard/saved", icon: <BiBookmarksIcon />, label: "Saved" },
        { to: "/settings", icon: <FiSettings size={30} />, label: "Settings" },
        // { to: "/dashboard/analytics", icon: <MdAnalyticsIcon />, label: "Analytics" },
        // { to: "/dashboard/tasks", icon: <BsClipboardCheckIcon />, label: "Tasks" },
    ];

    return <GeneralDashboardSidebar userDetail={userDetail} sidebarItems={sidebarItems} />;
};

export default DashboardSidebar;
