import React, { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import {
    CrownIcon,
    DropdownIcon,
    MobileIcon,
    Nav,
    NavbarContainer,
    NavItem,
    NavLink,
    NavLogo,
    NavLogoRouter,
    NavMenu,
    NavMenu2,
    NavUsersDetailsSection,
    RouterNavLeaderboardButtonLink,
} from "./NavbarElements";
import Dropdown from "../Dropdowns/Dropdown";
import UserOptions from "../UserOptions/UserOptions";
import { FaBars } from "react-icons/all";
import { getCDNUrl } from "../../../features/apiUrl";
import { SideOptionsContainer } from "../ExpElemenets";
import Exp from "../Exp";
import { useLocation } from "react-router-dom";

const logo = `${getCDNUrl}/assets/images/WebsiteLogo/ThecyberhubLogo.png`;
const Navbar = ({ isOpen, toggle }) => {
    const [scrollNav, setScrollNav] = useState(false);
    const [drop, setDrop] = useState(false);
    const [resourcesClick, setResourcesClick] = useState(true);
    const [opportunities, setOpportunities] = useState(true);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const location = useLocation();
    const onClickResources = () => {
        if (drop) setResourcesClick(false);
    };

    const onClickOpportunities = () => {
        if (drop) setOpportunities(false);
    };

    const dropHandler = (title) => {
        if (title === "resources") {
            setDrop(true);
            setResourcesClick(true);
            setOpportunities(false);
            setToggleDropdown(true);
        } else if (title === "programs") {
            setDrop(true);
            setOpportunities(true);
            setResourcesClick(false);
            setToggleDropdown(true);
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
                <NavLogoRouter to={"/"} onClick={toggleHome}>
                    <NavLogo src={logo} />
                </NavLogoRouter>
                <NavMenu>
                    {[
                        { to: "course", title: "Course", dropdown: "course" },
                        { to: "ctf", title: "CTF", dropdown: "ctf" },
                        { to: "tools", title: "Tools", dropdown: "tools" },
                        { to: "blogs", title: "Blogs", dropdown: "blogs" },
                        // {to: "social", title: "Social", dropdown: "social"},
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
                            dropdown: "programs",
                        },
                    ].map(({ to, title, dropdown }) => (
                        <NavItem
                            onMouseEnter={() => dropHandler(dropdown)}
                            onMouseLeave={() => dropHandler(dropdown)}
                            key={dropdown}
                        >
                            <NavLink to={to} className={location.pathname === `/${to}` ? "active" : ""}>
                                {title}
                            </NavLink>
                            {dropdown === "resources" && resourcesClick && drop && (
                                <Dropdown
                                    isResources={true}
                                    toggle={setToggleDropdown}
                                    toggleDropdown={toggleDropdown}
                                    isOpen={isOpen}
                                />
                            )}
                            {dropdown === "programs" && opportunities && drop && (
                                <Dropdown
                                    isOpportunities={true}
                                    toggle={setToggleDropdown}
                                    toggleDropdown={toggleDropdown}
                                    isOpen={isOpen}
                                />
                            )}
                        </NavItem>
                    ))}
                </NavMenu>
                <NavMenu2>
                    <NavItem>
                        <RouterNavLeaderboardButtonLink
                            to={"/leaderboard"}
                            className={location.pathname === `/${"leaderboard"}` ? "active" : ""}
                        >
                            <CrownIcon style={{ fontSize: "1.5rem" }} />
                            <span> Leaderboard </span>
                        </RouterNavLeaderboardButtonLink>
                    </NavItem>
                </NavMenu2>
                <NavUsersDetailsSection>
                    <Exp />
                    <SideOptionsContainer>
                        <MobileIcon onClick={toggle}>
                            <FaBars />
                        </MobileIcon>
                        <UserOptions />
                    </SideOptionsContainer>
                </NavUsersDetailsSection>
            </NavbarContainer>
        </Nav>
    );
};

export default Navbar;
