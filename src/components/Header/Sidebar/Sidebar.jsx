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
import { RouterButtonLink } from "../../Blogs/ManageBlogs/CreateBlog/CreateBlogElements";

const Sidebar = (props) => {
    const { isOpen, toggle } = props;

    const [drop, setDrop] = useState(false);
    const [resourcesClick, setResourcesClick] = useState(true);
    const [learnClick, setLearnClick] = useState(true);
    const [onClosed, setOnClosed] = useState(true);
    const onClickResources = () => {
        if (drop) setResourcesClick(false);
    };
    // const onClickLearn = () => {
    //     if (drop) setLearnClick(false);
    // };

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
                            // {
                            //     title: (
                            //         <>
                            //             <p onClick={() => onClickLearn()}>Learn</p>
                            //             <DropdownIcon onClick={() => onClickLearn()} />
                            //         </>
                            //     ),
                            //     dropdown: "learn",
                            // },
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
                        ].map(({ to, title, dropdown }) => (
                            <NavItem onClick={() => dropHandler(dropdown)} key={dropdown}>
                                <SidebarLink to={to} onClick={to && toggle}>
                                    {title}
                                </SidebarLink>
                                {dropdown === "learn" && learnClick && drop && (
                                    <Dropdown isLearn={true} toggle={toggle} closed={onClosed} isOpen={isOpen} />
                                )}
                                {dropdown === "resources" && resourcesClick && drop && (
                                    <Dropdown isResources={true} toggle={toggle} closed={onClosed} isOpen={isOpen} />
                                )}
                            </NavItem>
                        ))}
                    </SidebarMenu>
                    <SideBtnWrap>
                        {/*    <SidebarRedirectLink target={"_blank"} href={"https://thecyber-sec.com"}> */}
                        {/*        Our Services */}
                        {/*    </SidebarRedirectLink> */}
                        <RouterButtonLink to={"/leaderboard"}> Leaderboard </RouterButtonLink>
                        <RouterButtonLink to={"/dashboard/blogs/create"}> Create Blog </RouterButtonLink>
                    </SideBtnWrap>
                </SidebarWrapper>
            </SidebarContainer>
        )
    );
};

export default Sidebar;
