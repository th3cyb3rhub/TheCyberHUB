import React, { useState } from "react";
import Dropdown from "../Dropdowns/Dropdown";
import { CrownIcon, DropdownIcon, NavItem } from "../Navbar/NavbarElements";

import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarLink, SidebarMenu } from "./SidebarElements";

const Sidebar = (props) => {
    const { isOpen, toggle } = props;

    const [drop, setDrop] = useState(false);
    const [resourcesClick, setResourcesClick] = useState(true);
    const [onClosed, setOnClosed] = useState(true);
    const onClickResources = () => {
        if (drop) setResourcesClick(false);
    };
    const dropHandler = (title) => {
        if (title === "resources") {
            if (drop) {
                setDrop(false);
                setOnClosed(false);
            } else {
                setDrop(true);
                setOnClosed(true);
                setResourcesClick(true);
            }
        } else {
            setDrop(false);
        }
    };

    return (
        toggle && (
            <SidebarContainer isOpen={isOpen}>
                <Icon onClick={toggle}>
                    <CloseIcon onClick={() => setDrop(false)} />
                </Icon>
                <SidebarWrapper>
                    <SidebarMenu>
                        {[
                            { to: "freeCourse", title: "Free Course", dropdown: "freeCourse" },
                            { to: "tools", title: "Tools", dropdown: "tools" },
                            { to: "blogs", title: "Blogs", dropdown: "blogs" },
                            { to: "ctf", title: "CTF", dropdown: "ctf" },
                            { to: "internship", title: "Internship", dropdown: "Internship" },
                            {
                                to: "leaderboard",
                                title: (
                                    <span
                                        style={{
                                            gap: "5px",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <CrownIcon style={{ fontSize: "2rem" }} />
                                        <span> Leaderboard </span>
                                    </span>
                                ),
                                dropdown: "leaderboard",
                            },
                            {
                                title: (
                                    <>
                                        <p onClick={() => onClickResources()}>Resources</p>
                                        <DropdownIcon onClick={() => onClickResources()} />
                                    </>
                                ),
                                dropdown: "resources",
                            },
                        ].map(({ to, title, dropdown }) => (
                            <NavItem onClick={() => dropHandler(dropdown)} key={dropdown}>
                                <SidebarLink to={to} onClick={to && toggle}>
                                    {title}
                                </SidebarLink>
                                {dropdown === "resources" && resourcesClick && drop && (
                                    <Dropdown isResources={true} toggle={toggle} closed={onClosed} isOpen={isOpen} />
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
