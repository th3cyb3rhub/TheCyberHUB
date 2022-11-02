import React, { useState } from "react";
import Dropdown from "../Dropdowns/Dropdown";
import { DropdownIcon, NavItem } from "../Navbar/NavbarElements";

import {
    SidebarContainer,
    Icon,
    CloseIcon,
    SidebarWrapper,
    SidebarLink,
    SidebarMenu,
    SideBtnWrap,
} from "./SidebarElements";
import { RedirectButton } from "../../MixComponents/Buttons/ButtonElements";

const Sidebar = (props) => {
    const { isOpen, toggle } = props;
    const [drop, setDrop] = useState(false);
    const [resourcesClick, setResourcesClick] = useState(true);
    const [learnClick, setLearnClick] = useState(true);
    const [onClosed, setOnClosed] = useState(true);
    const onClickResources = () => {
        if (drop) setResourcesClick(false);
    };
    const onClickLearn = () => {
        if (drop) setLearnClick(false);
    };

    const dropHandler = (title) => {
        if (title === "learn") {
            if (drop) {
                setDrop(false);
                setOnClosed(false);
            } else {
                setDrop(true);
                setOnClosed(true);
                setLearnClick(true);
                setResourcesClick(false);
            }
        } else if (title === "resources") {
            if (drop) {
                setDrop(false);
                setOnClosed(false);
            } else {
                setDrop(true);
                setOnClosed(true);
                setLearnClick(false);
                setResourcesClick(true);
            }
        } else setDrop(false);
    };

    return (
        toggle && (
            <SidebarContainer isOpen={isOpen}>
                <Icon onClick={toggle}>
                    <CloseIcon />
                </Icon>
                <SidebarWrapper>
                    <SidebarMenu>
                        {[
                            {
                                to: null,
                                title: (
                                    <>
                                        <p onClick={() => onClickLearn()}>Learn</p>
                                        <DropdownIcon onClick={() => onClickLearn()} />
                                    </>
                                ),
                                dropdown: "learn",
                            },
                            {
                                to: null,
                                title: (
                                    <>
                                        <p onClick={() => onClickResources()}>Resources</p>
                                        <DropdownIcon onClick={() => onClickResources()} />
                                    </>
                                ),
                                dropdown: "resources",
                            },
                            { to: "events", title: "Events", dropdown: null },
                            { to: "projects", title: "Projects", dropdown: null },
                            { to: "community", title: "Community", dropdown: null },
                        ].map(({ to, title, dropdown }) => (
                            <NavItem onClick={() => dropHandler(dropdown)} key={to}>
                                <SidebarLink to={to} onClick={to && toggle}>
                                    {title}
                                </SidebarLink>
                                {dropdown === "learn" && learnClick && drop && (
                                    <Dropdown isLearn={true} toggle={setOnClosed} closed={onClosed} isOpen={isOpen} />
                                )}
                                {dropdown === "resources" && resourcesClick && drop && (
                                    <Dropdown
                                        isResources={true}
                                        toggle={setOnClosed}
                                        closed={onClosed}
                                        isOpen={isOpen}
                                    />
                                )}
                            </NavItem>
                        ))}
                    </SidebarMenu>
                    <SideBtnWrap>
                        <RedirectButton href={"https://discord.gg/QHBPq6xP5p"} target={"_blank"}>
                            Join Community
                        </RedirectButton>
                    </SideBtnWrap>
                </SidebarWrapper>
            </SidebarContainer>
        )
    );
};

export default Sidebar;
