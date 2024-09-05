import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    DashboardSidebarContainer,
    SidebarTitle,
    BiSolidChevronLeftIcon,
    BiSolidChevronRighIcon,
    UserProfile,
    UserProfileDescription,
    BiSolidCircleIcon,
    SideBarLink,
    SideBarLinkContainer,
} from "./GeneralDashboardSidebarElements";
import { cdnContentImagesUrl } from "src/features/apiUrl";

const GeneralDashboardSidebar = ({ userDetail, sidebarItems }) => {
    const avatar = cdnContentImagesUrl("/user/" + (userDetail?.avatar || "avatar.png"));

    const [isOpen, setIsOpen] = useState(true);

    return (
        <DashboardSidebarContainer $isOpen={isOpen}>
            <UserProfile $isOpen={isOpen}>
                <Link to={`/user/${userDetail?.username}`}>
                    <div className="user-profile-image">
                        <img
                            style={{
                                width: "40px",
                                height: "40px",
                            }}
                            src={avatar}
                            alt={`${userDetail?.username} Profile Picture `}
                        />
                        <BiSolidCircleIcon />
                    </div>
                </Link>
                <UserProfileDescription $isOpen={isOpen}>
                    <h4>{userDetail?.name}</h4>
                    <span>@{userDetail?.username}</span>
                </UserProfileDescription>
            </UserProfile>

            <SideBarLinkContainer $isOpen={isOpen}>
                {sidebarItems.map((item) => (
                    <SideBarLink key={item.to} to={item.to} $isOpen={isOpen}>
                        {item.icon}
                        {isOpen && <SidebarTitle $isOpen={isOpen}> {item.label} </SidebarTitle>}
                    </SideBarLink>
                ))}
            </SideBarLinkContainer>

            <SideBarLink
                style={{
                    height: "50px",
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    backgroundColor: "#2a2a2a",
                    display: "flex",
                    borderRadius: "0",
                    color: "#f5f5f5",
                }}
                $isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                    <>
                        <BiSolidChevronLeftIcon />
                        <SidebarTitle $isOpen={isOpen}> Collapse </SidebarTitle>
                    </>
                ) : (
                    <BiSolidChevronRighIcon />
                )}
            </SideBarLink>
        </DashboardSidebarContainer>
    );
};

export default GeneralDashboardSidebar;
