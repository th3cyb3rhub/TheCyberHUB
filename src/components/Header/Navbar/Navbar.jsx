import React, { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import {
    DropdownIcon,
    MobileIcon,
    Nav,
    NavbarContainer,
    NavButtonsSection,
    NavItem,
    NavLinks,
    NavLogo,
    NavLogoRouter,
    NavMenu,
    NavUsersDetailsSection,
    RouterNavCreateButtonLink,
    RouterNavLeaderboardButtonLink,
} from "./NavbarElements";
import Dropdown from "../Dropdowns/Dropdown";
import UserOptions from "../UserOptions/UserOptions";
import { FaBars } from "react-icons/all";
import { getCDNUrl } from "../../../features/apiUrl";
import Exp from "../Exp";

const logo = `${getCDNUrl}/images/assets/images/WebsiteLogo/ThecyberhubLogo.png`;
const Navbar = ({ isOpen, toggle }) => {
    const [scrollNav, setScrollNav] = useState(false);
    const [drop, setDrop] = useState(false);
    const [resourcesClick, setResourcesClick] = useState(true);
    const [learnClick, setLearnClick] = useState(true);
    const [onClosed, setOnClosed] = useState(true);

    const onClickResources = () => {
        if (drop) setResourcesClick(false);
    };

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
                        { to: "freeCourse", title: "Free Course", dropdown: "freeCourse" },
                        { to: "tools", title: "Tools", dropdown: "tools" },
                        { to: "blogs", title: "Blogs", dropdown: "blogs" },
                        { to: "ctf", title: "CTF", dropdown: "ctf" },
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
                                <Dropdown isResources={true} toggle={setOnClosed} closed={onClosed} isOpen={isOpen} />
                            )}
                        </NavItem>
                    ))}
                </NavMenu>
                <NavButtonsSection>
                    <RouterNavLeaderboardButtonLink to={"/leaderboard"}> Leaderboard </RouterNavLeaderboardButtonLink>
                    <RouterNavCreateButtonLink to={"/dashboard/blogs/create"}> Create Blog </RouterNavCreateButtonLink>
                </NavButtonsSection>
                <NavUsersDetailsSection>
                    <Exp />
                    <UserOptions />
                </NavUsersDetailsSection>
            </NavbarContainer>
        </Nav>
    );
};

export default Navbar;
