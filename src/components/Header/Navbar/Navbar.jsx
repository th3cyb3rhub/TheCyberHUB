import React, { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import {
    DropdownIcon,
    MobileIcon,
    Nav,
    NavbarContainer,
    NavItem,
    NavLink,
    NavLogo,
    NavLogoRouter,
    NavMenu,
    NavUsersDetailsSection,
} from "./NavbarElements";
import Dropdown from "src/components/Header/Dropdowns/Dropdown";
import UserOptions from "src/components/Header/UserOptions/UserOptions";
import { FaBars } from "react-icons/fa";
import { getCdnAssets } from "src/features/apiUrl";
import { SideOptionsContainer } from "src/components/Header/ExpElemenets";
import { useLocation } from "react-router-dom";

const logo = `${getCdnAssets}/images/ThecyberworldLogo/Thecyberworld_logo.png`;
// const logoThecyberworld = `${getCdnAssets}/images/ThecyberworldLogo/thecyberworld-logo-big.png`;

const Navbar = ({ isOpen, toggle }) => {
    // const { theme, toggleTheme } = useContext(ThemeContext);

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

    const pathName = location.pathname.split("/")[1].toLowerCase();
    const showBottomBorder = pathName !== "";

    return (
        <Nav onMouseLeave={() => setDrop(false)} $scrollNav={scrollNav} $showBottomBorder={showBottomBorder}>
            <NavbarContainer>
                <NavLogoRouter to={"/"} onClick={toggleHome}>
                    <NavLogo src={logo} alt="logo" />
                </NavLogoRouter>
                <NavMenu>
                    {[
                        { to: "explore", title: "Explore", dropdown: "explore" },
                        { to: "feeds", title: "Feeds", dropdown: "feeds" },
                        { to: "blogs", title: "Blogs", dropdown: "blogs" },
                        // { to: "forum", title: "Forum", dropdown: "forum" },
                        // { to: "courses", title: "Courses", dropdown: "courses" },
                        { to: "aiChat", title: "AI ", dropdown: "aiChat" },
                        { to: "ctf", title: "CTF", dropdown: "ctf" },
                        { to: "websecurity", title: "Web Security", dropdown: "websecurity" },
                        {
                            title: (
                                <>
                                    <p onClick={() => onClickResources()}>Resources</p>
                                    <DropdownIcon
                                        onClick={() => onClickResources()}
                                        clicked={resourcesClick && toggleDropdown ? "rotate(270deg)" : undefined}
                                    />
                                </>
                            ),
                            dropdown: "resources",
                        },
                        {
                            title: (
                                <>
                                    <p onClick={() => onClickOpportunities()}>Opportunities</p>
                                    <DropdownIcon
                                        onClick={() => onClickOpportunities()}
                                        clicked={opportunities && toggleDropdown ? "rotate(270deg)" : undefined}
                                    />
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
                            <NavLink to={to} className={pathName === `${to}` ? "active" : ""}>
                                {/* {location.pathname} */}
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
                <NavUsersDetailsSection>
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
