import React, { useState } from "react";
import Dropdown from "../Dropdowns/Dropdown";
import { CrownIcon, DropdownIcon, NavItem } from "../Navbar/NavbarElements";

import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarLink, SidebarMenu } from "./SidebarElements";

const Sidebar = (props) => {
    const { isOpen, toggle } = props;

    const [drop, setDrop] = useState(false);
    const [resourcesClick, setResourcesClick] = useState(true);
    const [opportunitiesClick, setOpportunitiesClick] = useState(true);
    const onClickResources = () => {
        if (drop) setResourcesClick(false);
    };
    const onClickOpportunities = () => {
        if (drop) setOpportunitiesClick(false);
    };

    const [toggleDropdown, setToggleDropdown] = useState(false);

    const dropHandler = (title) => {
        if (title === "resources") {
            setDrop(true);
            setResourcesClick(true);
            setOpportunitiesClick(false);
            setToggleDropdown(!toggleDropdown);
        } else if (title === "opportunities") {
            setDrop(true);
            setOpportunitiesClick(true);
            setResourcesClick(false);
            setToggleDropdown(!toggleDropdown);
        } else {
            setDrop(false);
            setResourcesClick(false);
            setOpportunitiesClick(false);
            setToggleDropdown(!toggleDropdown);
        }
    };

    const setDropHandler = () => {
        setDrop(false);
        setOpportunitiesClick(false);
        setResourcesClick(false);
    };

    return (
        toggle && (
            <SidebarContainer isOpen={isOpen}>
                <Icon onClick={toggle}>
                    <CloseIcon onClick={setDropHandler} />
                </Icon>
                <SidebarWrapper>
                    <SidebarMenu>
                        {[
                            {
                                to: "leaderboard",
                                title: (
                                    <span style={{ gap: "5px", display: "flex", alignItems: "center" }}>
                                        <CrownIcon style={{ fontSize: "2rem" }} />
                                        <span> Leaderboard </span>
                                    </span>
                                ),
                                dropdown: "leaderboard",
                            },
                            { to: "freeCourse", title: "Free Course", dropdown: "freeCourse" },
                            { to: "tools", title: "Tools", dropdown: "tools" },
                            { to: "blogs", title: "Blogs", dropdown: "blogs" },
                            { to: "ctf", title: "CTF", dropdown: "ctf" },
                            { to: "internship", title: "Internship", dropdown: "Internship" },
                            {
                                title: (
                                    <>
                                        <p onClick={() => onClickResources()}>Resources</p>
                                        <DropdownIcon onClick={() => onClickResources()} />
                                    </>
                                ),
                                dropdown: "resources",
                            },
                            {
                                title: (
                                    <>
                                        <p onClick={() => onClickOpportunities()}>Opportunities</p>
                                        <DropdownIcon onClick={() => onClickOpportunities()} />
                                    </>
                                ),
                                dropdown: "opportunities",
                            },
                        ].map(({ to, title, dropdown }) => (
                            <NavItem onClick={() => dropHandler(dropdown)} key={dropdown}>
                                <SidebarLink to={to} onClick={to && toggle}>
                                    {title}
                                </SidebarLink>
                                {dropdown === "resources" && resourcesClick && drop && (
                                    <Dropdown
                                        isResources={true}
                                        toggle={toggle}
                                        isOpen={isOpen}
                                        toggleDropdown={toggleDropdown}
                                    />
                                )}
                                {dropdown === "opportunities" && opportunitiesClick && drop && (
                                    <Dropdown
                                        isOpportunities={true}
                                        toggle={toggle}
                                        isOpen={isOpen}
                                        toggleDropdown={toggleDropdown}
                                    />
                                )}
                            </NavItem>
                        ))}
                    </SidebarMenu>
                </SidebarWrapper>
            </SidebarContainer>
        )
    );
};

export default Sidebar;
