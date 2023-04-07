import React, { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";

import {
    DropdownIcon,
    MobileIcon,
    Nav,
    NavbarContainer,
    NavItem,
    NavLinks,
    NavLogo,
    NavLogoRouter,
    NavMenu,
    NavUsersDetailsSection,
} from "./NavbarElements";

import Dropdown from "../Dropdowns/Dropdown";
import UserOptions from "../UserOptions/UserOptions";
import { FaBars } from "react-icons/all";
import { RouterButtonLink } from "../../Blogs/ManageBlogs/CreateBlog/CreateBlogElements";
import { getCDNUrl } from "../../../features/apiUrl";
const logo = `${getCDNUrl}/assets/images/WebsiteLogo/ThecyberhubLogo.png`;
// import { RouterButtonLink } from "../../Blogs/ManageBlogs/CreateBlog/CreateBlogElements";
const Navbar = ({ isOpen, toggle }) => {
    const [scrollNav, setScrollNav] = useState(false);
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
            setDrop(true);
            setLearnClick(true);
            setResourcesClick(false);
            setOnClosed(true);
        } else if (title === "resources") {
            setDrop(true);
            setResourcesClick(true);
            setLearnClick(false);
            setOnClosed(true);
        } else setDrop(false);
    };

    const changeNav = () => {
        if (window.scrollY >= 80) {
            setScrollNav(true);
        } else {
            setScrollNav(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", changeNav);
    }, []);
    const toggleHome = () => {
        scroll.scrollToTop();
    };

    return (
        <>
            <Nav onMouseLeave={() => setDrop(false)} scrollNav={scrollNav}>
                <NavbarContainer>
                    <MobileIcon onClick={toggle}>
                        <FaBars />
                    </MobileIcon>
                    <NavLogoRouter to={"/"} onClick={toggleHome}>
                        <NavLogo src={logo} />
                    </NavLogoRouter>
                    <NavMenu>
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
                            {
                                title: (
                                    <>
                                        <p onClick={() => onClickResources()}>Resources</p>
                                        <DropdownIcon onClick={() => onClickResources()} />
                                    </>
                                ),
                                dropdown: "resources",
                            },
                            // { to: "community", title: "Community", dropdown: "community" },
                            { to: "support", title: "Support", dropdown: "support" },
                        ].map(({ to, title, dropdown }) => (
                            <NavItem
                                onMouseEnter={() => dropHandler(dropdown)}
                                onMouseLeave={() => dropHandler(dropdown)}
                                key={dropdown}
                            >
                                <NavLinks to={to}>{title}</NavLinks>
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
                        {/* <NavRedirectLink target={"_blank"} href={"https://thecyber-sec.com"}> */}
                        {/*    Our Services */}
                        {/* </NavRedirectLink> */}
                        <RouterButtonLink to={"/dashboard/blogs/create"}> Create Blog </RouterButtonLink>
                    </NavMenu>
                    <NavUsersDetailsSection>
                        {/* <Exp /> */}
                        <UserOptions />
                    </NavUsersDetailsSection>
                </NavbarContainer>

                {/* <Streak /> */}
            </Nav>
        </>
    );
};

export default Navbar;
